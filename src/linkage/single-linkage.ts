import { AbstractCluster } from '../abstract-cluster';
import { AbstractLinkage } from './abstract-linkage';

export class SingleLinkage<T> extends AbstractLinkage<T> {

    public constructor(distanceFunc: (o1: T, o2: T) => number) {
        super(distanceFunc);
    }

    public calculate(c1: AbstractCluster<T>, c2: AbstractCluster<T>): number {
        let result = Infinity;
        c1.clusterElements().forEach((e1) => {
            c2.clusterElements().forEach((e2) => {
                result = Math.min(result, this.distanceFunc(e1, e2));
            });
        });
        return result;
    }

}
