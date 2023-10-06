import { LeafCluster } from './leaf-cluster';

export abstract class AbstractCluster<T> {
    public id: number;

    protected constructor(id: number) {
        this.id = id;
    }

    public abstract leafClusters(): LeafCluster<T>[];

    public clusterElementIds(): number[] {
        return this.leafClusters().map((e): number => e.id);
    }

    public clusterElements(): T[] {
        return this.leafClusters().map((e): T => e.object);
    }

    public size(): number {
        return this.leafClusters().length;
    }
}
