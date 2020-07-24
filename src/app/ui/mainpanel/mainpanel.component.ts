import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';
import { Key } from 'src/app/models/key';

@Component({
  selector: 'app-mainpanel',
  templateUrl: './mainpanel.component.html',
  styleUrls: ['./mainpanel.component.css']
})
export class MainpanelComponent implements OnInit, OnDestroy {

  private onDataAvailable: Subscription;

  private key: Key;

  count: number = 0;

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onDataAvailable = this.redisService.OnDataAvailable.subscribe(() => {
      this.key = this.redisService.CurrentKey();
      this.cd.detectChanges();
    });

    this.key = this.redisService.CurrentKey();
  }

  ngOnDestroy(): void {
    if (this.onDataAvailable) {
      this.onDataAvailable.unsubscribe();
    }
  }

}
