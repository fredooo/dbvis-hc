import { AverageLinkage } from '../../src/linkage/average-linkage';
import { LeafCluster } from '../../src/leaf-cluster';

test('average-linkage', () => {
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    const sl = new AverageLinkage(distFunc);
    expect(sl.calculate(new LeafCluster<number>(0, 1), new LeafCluster<number>(0, 3))).toBe(2);
});
