import { AbstractCluster } from '../abstract-cluster';
import { AbstractLinkage } from './abstract-linkage';

export class AverageGroupLinkage<T> extends AbstractLinkage<T> {
    public constructor(distanceFunc: (o1: T, o2: T) => number) {
        super(distanceFunc);
    }

    public calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number {
        let sum = 0;
        const all = c1.clusterElements().concat(c2.clusterElements());
        for (const e1 of all) {
            for (const e2 of all) {
                sum += this.distanceFunc(e1, e2);
            }
        }
        return (1 / ((c1.size() + c2.size()) * (c1.size() + c2.size() - 1))) * sum;
    }
}
