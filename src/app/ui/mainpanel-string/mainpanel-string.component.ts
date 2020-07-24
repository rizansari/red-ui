import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Key } from 'src/app/models/key';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpanel-string',
  templateUrl: './mainpanel-string.component.html',
  styleUrls: ['./mainpanel-string.component.css']
})
export class MainpanelStringComponent implements OnInit, OnDestroy {

  @Input()
  key: Key;

  //   @Input() set key(value: Key) {
  //     debugger
  //     this._key = value;
  //     this.formatData(this.formatType);
  //     this.cd.detectChanges();
  //  }

  formatType: string = "text";
  formattedData: string;

  private onDataAvailableSub: Subscription;

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onDataAvailableSub = this.redisService.OnDataAvailable.subscribe(() => {
      this.key = this.redisService.CurrentKey();
      this.formatData(this.formatType);
      this.cd.detectChanges();
    });

    this.key = this.redisService.CurrentKey();
    if (this.key) {
      this.formatData(this.formatType);
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.onDataAvailableSub) {
      this.onDataAvailableSub.unsubscribe();
    }
  }

  formatData(formatType) {
    this.formatType = formatType;

    try {
      if (formatType == "json") {
        var ugly = this.key.data;
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        this.formattedData = pretty;
      } else if (formatType == "text") {
        this.formattedData = this.key.data;
      }
    } catch (error) {
      console.log(error);
      this.formattedData = this.key.data;
    }
    
  }

  reloadKey() {
    this.redisService.reload();
  }

  deleteKey() {
    this.redisService.delete();
  }

}
