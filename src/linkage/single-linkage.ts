import { AbstractCluster } from '../abstract-cluster';
import { AbstractLinkage } from './abstract-linkage';

export class SingleLinkage<T> extends AbstractLinkage<T> {
    public constructor(distanceFunc: (o1: T, o2: T) => number) {
        super(distanceFunc);
    }

    public calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number {
        let result = Infinity;
        for (const e1 of c1.clusterElements()) {
            for (const e2 of c2.clusterElements()) {
                result = Math.min(result, this.distanceFunc(e1, e2));
            }
        }
        return result;
    }
}
