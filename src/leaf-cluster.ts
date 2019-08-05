import { AbstractCluster } from './abstract-cluster';

export class LeafCluster<T> extends AbstractCluster<T> {
    public object: T;

    public constructor(id: number, object: T) {
        super(id);
        this.object = object;
    }

    public clusterElementIds(): number[] {
        return [this.id];
    }

    public clusterElements(): T[] {
        return [this.object];
    }

    public size(): number {
        return 1;
    }
}
