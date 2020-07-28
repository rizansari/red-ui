import { Component, OnInit, OnDestroy } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit, OnDestroy {

  isTreeView: boolean = false;

  private OnViewChangedSub: Subscription;

  constructor(
    private redisService: RedisService
  ) { }

  ngOnInit(): void {
    this.OnViewChangedSub = this.redisService.OnViewChange.subscribe((isTreeView) => {
      this.isTreeView = isTreeView;
    });
  }

  ngOnDestroy(): void {
    if (this.OnViewChangedSub) {
      this.OnViewChangedSub.unsubscribe();
    }
  }

}
