import { ClusterFactory } from '../src/cluster-factory';

test('id counter', () => {
    const cf = new ClusterFactory<number>();
    const l1 = cf.createLeafCluster(99);
    expect(l1.id).toBe(0);
    const l2 = cf.createLeafCluster(98);
    expect(l2.id).toBe(1);
    const l3 = cf.createMergedCluster(l1, l2, 0.9);
    expect(l3.id).toBe(2);
});
