import { AbstractCluster } from './abstract-cluster';
import { LeafCluster } from './leaf-cluster';
import { MergedCluster } from './merged-cluster';

export class ClusterFactory<T> {

    private idCounter: number;

    constructor() {
        this.idCounter = 0;
    }

    public createLeafCluster(object: T): LeafCluster<T> {
        return new LeafCluster(this.idCounter++, object);
    }

    public createMergedCluster(c1: AbstractCluster<T>, c2: AbstractCluster<T>, distance: number): MergedCluster<T> {
        return new MergedCluster(this.idCounter++, c1, c2, distance);
    }

}