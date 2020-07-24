import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { RedisService } from 'src/app/services/redis.service';
import { Key } from 'src/app/models/key';

@Component({
  selector: 'app-mainpanel-list',
  templateUrl: './mainpanel-list.component.html',
  styleUrls: ['./mainpanel-list.component.css']
})
export class MainpanelListComponent implements OnInit, OnDestroy {

  @Input()
  key: Key;
  
  constructor(
    private redisService: RedisService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  reloadKey() {
    this.redisService.reload();
  }

  deleteKey() {
    this.redisService.delete();
  }

}
