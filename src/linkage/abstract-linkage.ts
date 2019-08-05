import { AbstractCluster } from '../abstract-cluster';

export abstract class AbstractLinkage<T> {
    protected distanceFunc: (o1: T, o2: T) => number;

    protected constructor(distanceFunc: (o1: T, o2: T) => number) {
        this.distanceFunc = distanceFunc;
    }

    public abstract calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number;
}
