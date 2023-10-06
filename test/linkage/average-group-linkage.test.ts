import { AverageGroupLinkage } from '../../src/linkage/average-group-linkage';
import { LeafCluster } from '../../src/leaf-cluster';

test('average-group-linkage', (): void => {
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    const sl = new AverageGroupLinkage(distFunc);
    expect(sl.calculate(new LeafCluster<number>(0, 1), new LeafCluster<number>(0, 3))).toBe(2);
});
