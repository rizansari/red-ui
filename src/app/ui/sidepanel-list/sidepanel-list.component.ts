import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';
import { Key } from '../../models/key';

@Component({
  selector: 'app-sidepanel-list',
  templateUrl: './sidepanel-list.component.html',
  styleUrls: ['./sidepanel-list.component.css']
})
export class SidepanelListComponent implements OnInit, OnDestroy {

  private onKeySub: Subscription;

  keys: Key[];

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onKeySub = this.redisService.OnKeysChange.subscribe(() => {
      this.keys = this.redisService.Keys();
      this.cd.detectChanges();
    });

    this.keys = this.redisService.Keys();
  }

  ngOnDestroy(): void {
    if (this.onKeySub) {
      this.onKeySub.unsubscribe();
    }
  }

  keyClick(key: Key) {
    this.redisService.setCurrentKey(key);
  }
}
