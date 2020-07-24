import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  private onInfoDataSub: Subscription;

  info: string = "";

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.unsubInfo();

    var self = this;
    this.onInfoDataSub = this.redisService.OnInfoDataAvailable.subscribe((data) => {
      self.info += `${data}\n`;
      this.cd.detectChanges();
    });
    this.redisService.info();
  }

  ngOnDestroy(): void {
    this.unsubInfo();
  }

  unsubInfo() {
    if (this.onInfoDataSub) {
      this.onInfoDataSub.unsubscribe();
    }
  }

}