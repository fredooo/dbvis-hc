import { AbstractCluster } from './abstract-cluster'

export class MergedCluster<T> extends AbstractCluster<T> {
    
    public leftChild: AbstractCluster<T>;
    public rightChild: AbstractCluster<T>;
    public distance: number;

    public constructor(id: number,
                       leftChild: AbstractCluster<T>,
                       rightChild: AbstractCluster<T>,
                       distance: number) {
        super(id);
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.distance = distance;
    }

    public clusterElementIds(): number[] {
        return this.leftChild.clusterElementIds().concat(this.rightChild.clusterElementIds());
    }

    public clusterElements(): T[] {
        return this.leftChild.clusterElements().concat(this.rightChild.clusterElements());
    }

    public size(): number {
        return this.leftChild.size() + this.rightChild.size();
    }

}
