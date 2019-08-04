import { AbstractCluster } from './abstract-cluster';
import { ClusterFactory } from './cluster-factory';
import { AbstractLinkage } from './linkage/abstract-linkage';

export class HierarchicalClustering<T> {

    public clusters: Array<AbstractCluster<T>>;

    private objects: T[];
    private linkage: AbstractLinkage<T>;

    private clusterFactory: ClusterFactory<T>;
    private linkageValues: Array<{ c1: AbstractCluster<T>; c2: AbstractCluster<T>; value: number }>;

    public constructor(objects: T[], linkage: AbstractLinkage<T>) {
        this.clusterFactory = new ClusterFactory();
        this.objects = objects;
        this.linkage = linkage;
        this.clusters = this.objects.map((e) => this.clusterFactory.createLeafCluster(e));
        this.linkageValues = [];
        this.initializeLinkageValues();
    }

    public cluster(): AbstractCluster<T> {
        while (this.clusters.length > 1) {
            this.linkageValues.sort((e1, e2) => e1.value - e2.value);
            const { c1, c2, value } = this.linkageValues[0];
            const merged = this.clusterFactory.createMergedCluster(c1, c2, value);
            this.clusters = this.clusters.filter((e) => !(e.id === c1.id || e.id === c2.id));
            this.linkageValues =
                this.linkageValues.filter(
                    (e) => !(e.c1.id === c1.id || e.c1.id === c2.id || e.c2.id === c1.id || e.c2.id === c2.id));
            this.clusters.forEach((c) => {
                this.linkageValues.push({
                    c1: c,
                    c2: merged,
                    value: this.linkage.calculate(c, merged),
                });
            });
            this.clusters.push(merged);
        }
        return this.clusters[0];
    }
    
    private initializeLinkageValues(): void {
        for (let i = 0; i < this.clusters.length; i++) {
            for (let j = 0; j < this.clusters.length; j++) {
                if (i === j) {
                    continue;
                }
                const c1 = this.clusters[i];
                const c2 = this.clusters[j];
                const existing =
                    this.linkageValues.find(
                        (e) => (e.c1.id === c1.id && e.c2.id === c2.id || e.c1.id === c2.id && e.c2.id === c1.id));
                if (!existing) {
                    this.linkageValues.push({
                        c1,
                        c2,
                        value: this.linkage.calculate(c1, c2),
                    });
                }
            }
        }
    }

}
