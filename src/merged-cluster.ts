import { AbstractCluster } from './abstract-cluster';
import { LeafCluster } from './leaf-cluster';

export class MergedCluster<T> extends AbstractCluster<T> {
    public leftChild: AbstractCluster<T>;
    public rightChild: AbstractCluster<T>;
    public distance: number;

    private _leafClusters: LeafCluster<T>[] | undefined;

    public constructor(id: number, leftChild: AbstractCluster<T>, rightChild: AbstractCluster<T>, distance: number) {
        super(id);
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.distance = distance;
    }

    public leafClusters(): LeafCluster<T>[] {
        if (!this._leafClusters) {
            this._leafClusters = this.leftChild.leafClusters().concat(this.rightChild.leafClusters());
        }
        return this._leafClusters;
    }
}
