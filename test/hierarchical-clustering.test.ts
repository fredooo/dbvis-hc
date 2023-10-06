import { Dendrogram } from '../src/dendrogram';
import { HierarchicalClustering } from '../src/hierarchical-clustering';
import { CentroidLinkage } from '../src/linkage/centroid-linkage';
import { WardLinkage } from "../src/linkage/ward-linkage";

// Simple test data
const data0 = [10, 0.9, 1.0, 11, 1.1];
const data1 = [11, 0.8, 10, 1.1, 1.2];

// Distance function required by all linkage strategies
const distFunc = (a: number, b: number): number => Math.abs(a - b);

// Aggregation function only needed by the centroid and ward linkage strategy
const aggrFunc = (v: number[]): number => v.reduce((acc, curr): number => acc + curr, 0) / v.length;

test('perform centroid linkage clustering', (): void => {
    const hc = new HierarchicalClustering<number>(data0, new CentroidLinkage(distFunc, aggrFunc));
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

test('perform ward linkage clustering', (): void => {
    // Distance function required by all linkage strategies
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    // Aggregation function only needed by the centroid linkage strategy
    const aggrFunc = (v: number[]): number => v.reduce((acc, curr): number => acc + curr, 0) / v.length;
    const hc = new HierarchicalClustering<number>(data1, new WardLinkage(distFunc, aggrFunc));
    const rootCluster = hc.cluster();
    // Split cluster according to the dendrogram and a cut-off value
    const dendrogram = new Dendrogram<number>(rootCluster, 9.3);
    const clustersAsRefs = dendrogram.extractClustersAsRefs();
    // clustersAsRefs: [ [1.1, 0.9, 1.0], [10, 11] ]
    expect(clustersAsRefs[0]).toEqual(expect.arrayContaining([0.8, 1.1, 1.2]));
    expect(clustersAsRefs[1]).toEqual(expect.arrayContaining([11, 10]));
    const clustersAsIds = dendrogram.extractClustersAsIds();
    // clustersAsIds: [ [ 4, 1, 2 ], [ 3, 0 ] ]
    expect(clustersAsIds[0]).toEqual(expect.arrayContaining([1, 3, 4]));
    expect(clustersAsIds[1]).toEqual(expect.arrayContaining([0, 2]));
});
