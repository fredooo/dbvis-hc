import { Dendrogram } from '../src/dendrogram';
import { HierarchicalClustering } from '../src/hierarchical-clustering';
import { CentroidLinkage } from '../src/linkage/centroid-linkage';

test('perform clustering', () => {
    const data = [ 10, 0.9, 1.0, 11, 1.1 ];
    const distFunc = (a: number, b: number) => Math.abs(a - b);
    const aggrFunc = (v: number[]) => v.reduce((acc, curr) => acc + curr, 0) / v.length;
    const hc = new HierarchicalClustering(data, new CentroidLinkage(distFunc, aggrFunc));
    const dendrogram = new Dendrogram<number>(hc.cluster(), 9.3);
    const clusters = dendrogram.extractClusters();
    expect(clusters[0]).toEqual(expect.arrayContaining([ 4, 1, 2 ]));
    expect(clusters[1]).toEqual(expect.arrayContaining([ 0, 3 ]));
});