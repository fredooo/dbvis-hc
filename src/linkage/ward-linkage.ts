import { AbstractCluster } from '../abstract-cluster';
import { AbstractLinkage } from './abstract-linkage';

export class WardLinkage<T> extends AbstractLinkage<T> {
    private readonly aggregationFunc: (v: T[]) => T;

    public constructor(distanceFunc: (o1: T, o2: T) => number, aggregationFunc: (v: T[]) => T) {
        super(distanceFunc);
        this.aggregationFunc = aggregationFunc;
    }

    public calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number {
        const c1Size = c1.clusterElements().length;
        const c2Size = c2.clusterElements().length;
        const centroid1 = this.aggregationFunc(c1.clusterElements());
        const centroid2 = this.aggregationFunc(c2.clusterElements());
        return ((c1Size * c2Size) / (c1Size + c2Size)) * this.distanceFunc(centroid1, centroid2);
    }
}
