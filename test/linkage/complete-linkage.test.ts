import { CompleteLinkage } from '../../src/linkage/complete-linkage';
import { LeafCluster } from '../../src/leaf-cluster';

test('complete-linkage', (): void => {
    const distFunc = (a: number, b: number): number => Math.abs(a - b);
    const sl = new CompleteLinkage(distFunc);
    expect(sl.calculate(new LeafCluster<number>(0, 1), new LeafCluster<number>(0, 3))).toBe(2);
});
