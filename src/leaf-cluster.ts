import { AbstractCluster } from './abstract-cluster';

export class LeafCluster<T> extends AbstractCluster<T> {
    public object: T;

    public constructor(id: number, object: T) {
        super(id);
        this.object = object;
    }

    public leafClusters(): LeafCluster<T>[] {
        return [this];
    }
}
