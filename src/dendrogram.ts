import { AbstractCluster } from './abstract-cluster';
import { LeafCluster } from './leaf-cluster';
import { MergedCluster } from './merged-cluster';

export class Dendrogram<T> {
    public cluster: AbstractCluster<T>;
    public cutOffValue: number;

    private groups: number[][];

    public constructor(cluster: AbstractCluster<T>, cutOffValue: number) {
        this.cluster = cluster;
        this.cutOffValue = cutOffValue;
        this.groups = [];
    }

    public extractClusters(): number[][] {
        this.extractClustersRecursively(this.cluster);
        return this.groups;
    }

    private extractClustersRecursively(curr: AbstractCluster<T>): void {
        if (curr instanceof LeafCluster) {
            this.groups.push([curr.id]);
        } else {
            const merged = curr as MergedCluster<T>;
            if (merged.distance < this.cutOffValue) {
                this.groups.push(curr.clusterElementIds());
            } else {
                this.extractClustersRecursively(merged.leftChild);
                this.extractClustersRecursively(merged.rightChild);
            }
        }
    }
}
