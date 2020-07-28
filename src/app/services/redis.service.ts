import { Injectable, EventEmitter, Output } from '@angular/core';
import { Connection } from '../models/connection';
import { Subscription, Subject } from 'rxjs';
import { Key } from '../models/key';

const { remote, ipcRenderer } = (<any>window).require('electron');
const app = (<any>window).require('electron').remote.app
const mainProcess = remote.require(app.getAppPath() + '/main.js');

@Injectable({
  providedIn: 'root'
})
export class RedisService {

  // @ts-ignore
  private redis: any;
  private stream: any;
  private keys: Key[] = new Array<Key>();
  private key: Key;

  private monitor: any;

  private onKeySub: Subscription;

  @Output()
  OnConnect: EventEmitter<any> = new EventEmitter();

  @Output()
  OnShowConnectDialog: EventEmitter<any> = new EventEmitter();

  @Output()
  OnDisonnect: EventEmitter<any> = new EventEmitter();

  @Output()
  OnStatus: EventEmitter<any> = new EventEmitter();

  OnKeysChange: EventEmitter<any> = new EventEmitter();

  OnDataAvailable: EventEmitter<any> = new EventEmitter();

  OnMonitorDataAvailable: EventEmitter<any> = new EventEmitter();

  OnInfoDataAvailable: EventEmitter<any> = new EventEmitter();

  OnViewChange: EventEmitter<any> = new EventEmitter();

  Keys(): Key[] {
    return this.keys;
  }

  CurrentKey(): Key {
    return this.key;
  }

  constructor() {
    ipcRenderer.on('connect', () => {
      this.OnShowConnectDialog.emit();
    });

    ipcRenderer.on('disconnect', () => {
      this.disconnect();
    });
  }

  connect(connection: Connection) {

    if (this.redis) {
      this.disconnect();
    }

    this.redis = mainProcess.getRedisObject(connection);

    var self = this;

    this.redis.on("error", function (error) {
      self.OnStatus.emit("ERROR");
    });

    this.redis.on("connect", function () {
      self.OnStatus.emit("CONNECT");
    });

    this.redis.on("ready", function () {
      self.OnStatus.emit("READY");
    });

    this.redis.on("close", function () {
      self.OnStatus.emit("CLOSE");
    });

    this.redis.on("reconnecting", function () {
      self.OnStatus.emit("RECONNECTING");
    });

    this.redis.on("end", function () {
      self.OnStatus.emit("END");
    });

    this.redis.connect().then(() => {
      console.log("connected");
      this.OnConnect.emit();

      if (this.onKeySub) {
        this.onKeySub.unsubscribe();
      }
      this.onKeySub = this.OnKeysChange.subscribe(() => {
        self.applyKeyChanges();
      });
    })
      .catch((err) => {
        console.log("error");
      });
  }

  disconnect() {
    this.redis.disconnect();
    this.OnDisonnect.emit();

    if (this.onKeySub) {
      this.onKeySub.unsubscribe();
    }
  }

  scanKeys(pattern: string) {

    this.keys = new Array<Key>();

    var self = this;

    if (this.stream) {
      this.stream.destroy();
    }

    this.stream = this.redis.scanStream({
      match: pattern,
      count: 100,
    });

    this.stream.on("data", function (result) {

      self.stream.pause();

      console.log("data:" + result.length);
      for (var i = 0; i < result.length; i++) {
        self.keys.push({ key: result[i], data: "", keyType: "", ttl: -3, hashData: null });
      }

      self.OnKeysChange.emit();

    });

    this.stream.on("end", function () {
      console.log("all keys have been visited");
    });
  }

  scanMore() {
    if (this.stream) {
      this.stream.resume();
    }
  }

  allKeys(pattern: string) {

    this.keys = new Array<Key>();

    if (!pattern || pattern === '') {
      pattern = '*';
    }

    var self = this;
    this.redis.keys(pattern).then((result: string[]) => {
      for (var i = 0; i < result.length; i++) {
        self.keys.push({ key: result[i], data: "", keyType: "", ttl: -3, hashData: null });
      }
      self.OnKeysChange.emit();
    });
  }

  count(): number {
    if (this.keys) {
      return this.keys.length;
    } else {
      return 0;
    }
  }

  applyKeyChanges() {
    console.log("apply");
  }

  setCurrentKey(key: Key) {

    this.redis.type(key.key).then((type) => {
      key.keyType = type;

      this.redis.ttl(key.key).then((ttl) => {
        key.ttl = ttl;

        if (type === "string") {
          this.redis.get(key.key).then((data) => {
            key.data = data;
            this.key = key;
            this.OnDataAvailable.emit();
          });
        } else if (type === "set") {
          this.redis.smembers(key.key).then((data) => {
            key.data = data;
            this.key = key;
            this.OnDataAvailable.emit();
          });
        } else if (type === "hash") {
          this.redis.hgetall(key.key).then((data) => {
            key.data = data;
            key.hashData = Object.keys(data);
            this.key = key;
            this.OnDataAvailable.emit();
          });
        } else if (type === "list") {
          this.redis.lrange(key.key, 0, -1).then((data) => {
            key.data = data;
            this.key = key;
            this.OnDataAvailable.emit();
          });
        }
      });
    });
  }

  reload() {
    var key = this.key;

    this.redis.ttl(key.key).then((ttl) => {
      key.ttl = ttl;

      if (key.keyType === "string") {
        this.redis.get(key.key).then((data) => {
          key.data = data;
          this.key = key;
          this.OnDataAvailable.emit();
        });
      } else if (key.keyType === "set") {
        this.redis.smembers(key.key).then((data) => {
          key.data = data;
          this.key = key;
          this.OnDataAvailable.emit();
        });
      } else if (key.keyType === "hash") {
        this.redis.hgetall(key.key).then((data) => {
          key.data = data;
          key.hashData = Object.keys(data);
          this.key = key;
          this.OnDataAvailable.emit();
        });
      } else if (key.keyType === "list") {
        this.redis.lrange(key.key, 0, -1).then((data) => {
          key.data = data;
          this.key = key;
          this.OnDataAvailable.emit();
        });
      }
    });
  }

  delete() {
    debugger;
    this.redis.del(this.key.key);
  }

  monitorStart() {
    if (this.monitor) {
      this.monitor.disconnect();
    }

    var self = this;
    this.redis.monitor().then(function (monitor) {
      self.monitor = monitor;
      monitor.on('monitor', function (time, args, source, database) {
        self.OnMonitorDataAvailable.emit(time + ": " + args)
      });
    });

  }

  monitorStop() {
    if (this.monitor) {
      this.monitor.disconnect();
    }
  }

  info() {

    if (!this.redis) {
      return;
    }
    
    this.redis.info().then((data) => {
      this.OnInfoDataAvailable.emit(data);
    });
  }

  setView(isTree: boolean) {
    this.OnViewChange.emit(isTree);
  }
  
}
