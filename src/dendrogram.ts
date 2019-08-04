import { AbstractCluster } from './abstract-cluster';
import { LeafCluster } from './leaf-cluster';
import { MergedCluster } from './merged-cluster';

export class Dendrogram<T> {

    public cluster: AbstractCluster<T>;
    public cutOffValue: number;

    private groups: number[][];

    constructor(cluster: AbstractCluster<T>, cutOffValue: number) {
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
            this.groups.push([ curr.id ]);
        } else {
            const merged: MergedCluster<T> = curr as MergedCluster<T>;
            if (merged.distance <= this.cutOffValue) {
                this.groups.push(curr.clusterElementIds());
            } else {
                if (merged.leftChild) {
                    this.extractClustersRecursively(merged.leftChild);
                }
                if (merged.rightChild) {
                    this.extractClustersRecursively(merged.rightChild);
                }
            }
        }
    }

}
