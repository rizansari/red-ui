import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy, AfterViewInit {

  private onMonitorDataSub: Subscription;

  log: string = "";

  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.unsubMonitor();

    var self = this;
    this.onMonitorDataSub = this.redisService.OnMonitorDataAvailable.subscribe((data) => {
      self.log += `${data}\n`;
      console.log(data);
      this.cd.detectChanges();
    });
    this.redisService.monitorStart();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubMonitor();
    this.redisService.monitorStop();
  }

  unsubMonitor() {
    if (this.onMonitorDataSub) {
      this.onMonitorDataSub.unsubscribe();
    }
  }

}
