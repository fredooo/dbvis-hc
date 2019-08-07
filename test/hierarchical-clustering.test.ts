import { Dendrogram } from '../src/dendrogram';
import { HierarchicalClustering } from '../src/hierarchical-clustering';
import { CentroidLinkage } from '../src/linkage/centroid-linkage';

test('perform clustering', () => {
    const data = [10, 0.9, 1.0, 11, 1.1];
    // Distance function required by all linkage strategies
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    // Aggregation function only needed by the centroid linkage strategy
    const aggrFunc = (v: number[]): number => v.reduce((acc, curr) => acc + curr, 0) / v.length;
    const hc = new HierarchicalClustering<number>(data, new CentroidLinkage(distFunc, aggrFunc));
    const rootCluster = hc.cluster();
    // Split cluster according to the dendrogram and a cut-off value
    const dendrogram = new Dendrogram<number>(rootCluster, 9.3);
    const clustersAsRefs = dendrogram.extractClustersAsRefs();
    // clustersAsRefs: [ [1.1, 0.9, 1.0], [10, 11] ]
    expect(clustersAsRefs[0]).toEqual(expect.arrayContaining([1.1, 0.9, 1.0]));
    expect(clustersAsRefs[1]).toEqual(expect.arrayContaining([10, 11]));
    const clustersAsIds = dendrogram.extractClustersAsIds();
    // clustersAsIds: [ [ 4, 1, 2 ], [ 3, 0 ] ]
    expect(clustersAsIds[0]).toEqual(expect.arrayContaining([4, 1, 2]));
    expect(clustersAsIds[1]).toEqual(expect.arrayContaining([0, 3]));
});
