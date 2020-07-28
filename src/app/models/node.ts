import { Key } from './key';

export class Node {
    public Key: string;
    public FullKey: string;
    public Value: string;
    public Level: number;
    public isLeaf: boolean;
    public keyObject: Key;

    public Children: Node[];
    public Parent: Node;

    public Selected: boolean;

    constructor(Key?: string, FullKey?: string, Selected?: boolean, keyObject?: Key) {
        this.Key = Key;
        this.FullKey = FullKey;
        this.Value = undefined;
        this.Level = undefined;
        this.isLeaf = undefined;
        this.Children = Array();
        this.Parent = undefined;
        this.Selected = Selected;
        this.keyObject = keyObject;
    }
}