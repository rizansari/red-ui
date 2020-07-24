import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Key } from 'src/app/models/key';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpanel-hash',
  templateUrl: './mainpanel-hash.component.html',
  styleUrls: ['./mainpanel-hash.component.css']
})
export class MainpanelHashComponent implements OnInit, OnDestroy {

  @Input()
  key: Key;
  
  private onDataAvailableSub: Subscription;

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.onDataAvailableSub = this.redisService.OnDataAvailable.subscribe(() => {
    //   this.key = this.redisService.CurrentKey();
    //   this.cd.detectChanges();
    // });

    // this.key = this.redisService.CurrentKey();
    // if (this.key) {
    //   //this.cd.detectChanges();
    // }
  }

  ngOnDestroy(): void {
    if (this.onDataAvailableSub) {
      this.onDataAvailableSub.unsubscribe();
    }
  }

  reloadKey() {
    this.redisService.reload();
  }

  deleteKey() {
    this.redisService.delete();
  }

}
