import { AbstractCluster } from './abstract-cluster';

export class MergedCluster<T> extends AbstractCluster<T> {
    public leftChild: AbstractCluster<T>;
    public rightChild: AbstractCluster<T>;
    public distance: number;

    private _clusterElementIds: number[] | undefined;
    private _clusterElements: T[] | undefined;
    private _size: number | undefined;

    public constructor(id: number, leftChild: AbstractCluster<T>, rightChild: AbstractCluster<T>, distance: number) {
        super(id);
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.distance = distance;
    }

    public clusterElementIds(): number[] {
        if (!this._clusterElementIds) {
            console.log('HIT');
            this._clusterElementIds = this.leftChild.clusterElementIds().concat(this.rightChild.clusterElementIds());
        }
        return this._clusterElementIds;
    }

    public clusterElements(): T[] {
        if (!this._clusterElements) {
            console.log('HIT');
            this._clusterElements = this.leftChild.clusterElements().concat(this.rightChild.clusterElements());
        }
        return this._clusterElements;
    }

    public size(): number {
        if (!this._size) {
            console.log('HIT');
            this._size = this.leftChild.size() + this.rightChild.size();
        }
        return this._size;
    }
}
