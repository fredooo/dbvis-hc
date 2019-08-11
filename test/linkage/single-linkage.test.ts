import { SingleLinkage } from '../../src/linkage/single-linkage';
import { LeafCluster } from '../../src/leaf-cluster';

test('single-linkage', () => {
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    const sl = new SingleLinkage(distFunc);
    expect(sl.calculate(new LeafCluster<number>(0, 1), new LeafCluster<number>(0, 3))).toBe(2);
});
