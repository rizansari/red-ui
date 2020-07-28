import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RedisService } from 'src/app/services/redis.service';
import { Key } from 'src/app/models/key';
import { TreeGenService } from 'src/app/services/tree-gen.service';
import { Tree } from 'src/app/models/tree';
import { Node } from 'src/app/models/node';

@Component({
  selector: 'app-sidepanel-tree',
  templateUrl: './sidepanel-tree.component.html',
  styleUrls: ['./sidepanel-tree.component.css']
})
export class SidepanelTreeComponent implements OnInit, OnDestroy {

  private onKeySub: Subscription;

  keys: Key[];
  keyTree: Tree;

  constructor(
    private redisService: RedisService,
    private treeGenService: TreeGenService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.onKeySub = this.redisService.OnKeysChange.subscribe(() => {
      this.keys = this.redisService.Keys();
      this.keyTree = this.treeGenService.createHierarchy(this.keys);
      this.cd.detectChanges();
    });

    this.keys = this.redisService.Keys();
    this.keyTree = this.treeGenService.createHierarchy(this.keys);

    this.cd.detectChanges();
    
    console.log(this.keyTree.root);
  }

  ngOnDestroy(): void {
    if (this.onKeySub) {
      this.onKeySub.unsubscribe();
    }
  }

  keyClick(key: Key) {
    this.redisService.setCurrentKey(key);
  }

  deleteKey(key: Key) {
    this.redisService.setCurrentKey(key);
  }

  getChildren = (node: Node) => node.Children;

}
