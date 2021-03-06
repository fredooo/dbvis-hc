import { AbstractCluster } from '../abstract-cluster';
import { AbstractLinkage } from './abstract-linkage';

export class CentroidLinkage<T> extends AbstractLinkage<T> {
    private aggregationFunc: (v: T[]) => T;

    public constructor(distanceFunc: (o1: T, o2: T) => number, aggregationFunc: (v: T[]) => T) {
        super(distanceFunc);
        this.aggregationFunc = aggregationFunc;
    }

    public calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number {
        const centroid1 = this.aggregationFunc(c1.clusterElements());
        const centroid2 = this.aggregationFunc(c2.clusterElements());
        return this.distanceFunc(centroid1, centroid2);
    }
}
