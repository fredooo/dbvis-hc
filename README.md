# dbvis-hc

A TypeScript implementation of a hierarchical clustering algorithm.

### Install

Install with `npm`:

```bash
npm install --save dbvis-hc
```

This package requires module resolution by Node in `tsconfig.json`:

```json
"compilerOptions": {
    "moduleResolution": "node"
}
```

### Usage

Example:

```javascript
    const data = [ 10, 0.9, 1.0, 11, 1.1 ];
    // Distance function required by all linkage strategies 
    const distFunc = (a: number, b: number) => Math.abs(a - b);
    // Aggregation function only needed by the centroid linkage strategy
    const aggrFunc = (v: number[]) => v.reduce((acc, curr) => acc + curr, 0) / v.length;
    const hc = new HierarchicalClustering(data, new CentroidLinkage(distFunc, aggrFunc));
    const dendrogram = new Dendrogram<number>(hc.cluster(), 9.3);
    const clusters = dendrogram.extractClusters();
    // Output: [ [ 4, 1, 2 ], [ 0, 3 ] ]
```
