import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Connection } from 'src/app/models/connection';
import { RedisService } from 'src/app/services/redis.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  connectDialog = false;

  connection: Connection = new Connection();

  status: string = "UNDEFINED";
  filterExp: string = "";

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.redisService.OnConnect.subscribe(() => {
      this.connectDialog = false;
    });

    this.redisService.OnDisonnect.subscribe(() => {
      console.log("disconnected");
    });

    this.redisService.OnStatus.subscribe((status) => {
      console.log(status);
      this.status = status;
      this.cd.detectChanges();
    });

    this.redisService.OnShowConnectDialog.subscribe(() => {
      this.connectDialog = true;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.redisService.OnConnect.unsubscribe();
    this.redisService.OnDisonnect.unsubscribe();
    this.redisService.OnStatus.unsubscribe();
    this.redisService.OnShowConnectDialog.unsubscribe();
  }

  showConnectDialog() {
    this.connectDialog = true;
  }

  connect() {
    this.redisService.connect(this.connection);
  }

  disconnect() {
    this.redisService.disconnect();
  }

  getKeys() {
    this.redisService.allKeys(this.filterExp);
  }

  scanKeys() {
    this.redisService.scanKeys(this.filterExp);
  }

  scanMore() {
    this.redisService.scanMore();
  }
}
