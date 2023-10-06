import { AbstractCluster } from './abstract-cluster';
import { LeafCluster } from './leaf-cluster';
import { MergedCluster } from './merged-cluster';

export class Dendrogram<T> {
    public cluster: AbstractCluster<T>;
    public cutOffValue: number;

    private groups: LeafCluster<T>[][];

    public constructor(cluster: AbstractCluster<T>, cutOffValue: number) {
        this.cluster = cluster;
        this.cutOffValue = cutOffValue;
        this.groups = [];
    }

    public extractClustersAsRefs(): T[][] {
        this.groups = [];
        this.extractClustersRecursively(this.cluster);
        return this.groups.map((g): T[] => g.map((c): T => c.object));
    }

    public extractClustersAsIds(): number[][] {
        this.groups = [];
        this.extractClustersRecursively(this.cluster);
        return this.groups.map((g): number[] => g.map((c): number => c.id));
    }

    /**
     * @deprecated
     */
    public extractClusters(): number[][] {
        return this.extractClustersAsIds();
    }

    private extractClustersRecursively(curr: AbstractCluster<T>): void {
        if (curr instanceof LeafCluster) {
            this.groups.push(curr.leafClusters());
        } else {
            const merged = curr as MergedCluster<T>;
            if (merged.distance < this.cutOffValue) {
                this.groups.push(curr.leafClusters());
            } else {
                this.extractClustersRecursively(merged.leftChild);
                this.extractClustersRecursively(merged.rightChild);
            }
        }
    }
}
