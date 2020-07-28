import { Injectable } from '@angular/core';
import { Tree } from '../models/tree';
import { Node } from '../models/node';
import { Key } from '../models/key';

@Injectable({
  providedIn: 'root'
})
export class TreeGenService {

  seperator = ':';

  constructor() { }

  createHierarchy(keys: Key[]): Tree {
    var tree = new Tree();
    var node = new Node();
    node.Parent = null;
    node.Key = "db0";
    node.FullKey = "db0";
    tree.root = node;

    keys.forEach(key => {
      this.addKey(key.key, tree, key);
    });

    return tree;
  }

  private addKey(key: string, tree: Tree, keyObject: Key) {

    var seperator = this.seperator;

    var tokens: string[];
    if (key.indexOf(seperator) > 0) {
      var tokens = key.split(seperator);
    } else {
      tokens = new Array();
      tokens.push(key);
    }

    var index = 0;
    var fullToken: string = "";
    tokens.forEach(token => {

      //debugger;
      var exists: boolean = false;

      tree.contains(function (node: Node) {
        var temp = "";
        if (index == 0) {
          temp = token;
        } else {
          temp = fullToken + seperator + token;;
        }
        if (node.FullKey === temp) {
          exists = true;
          return;
        }
      }, tree.traverseDF);

      if (!exists) {
        if (index == 0) {
          tree.add(new Node(token, token), "db0", tree.traverseDF);
          fullToken += token;
        } else {

          var node = new Node(token, fullToken + seperator + token);
          node.keyObject = keyObject;

          tree.add(node, fullToken, tree.traverseDF);
          fullToken += seperator + token;
        }
      } else {
        if (index == 0) {
          fullToken += token;
        } else {
          fullToken += seperator + token;
        }
      }
      index++;
    });

  }
}
