dbvis-hc
========

[![Build Status](https://travis-ci.org/fredooo/dbvis-hc.svg?branch=master)](https://travis-ci.org/fredooo/dbvis-hc) [![npm version](https://badge.fury.io/js/dbvis-hc.svg)](https://badge.fury.io/js/dbvis-hc) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript implementation of [AGNES][1], an agglomerative hierarchical clustering algorithm.

### Install

Install with `npm`:

```bash
npm install --save dbvis-hc
```

This package requires module resolution by Node in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "moduleResolution": "node"
    }   
}
```

### Usage

This implementation can be used to cluster generic objects, given a useful definition of distance and in case of the Centroid-Linkage, additionally a definition for aggregation.

Example:

```javascript
    import { CentroidLinkage, Dendrogram, HierarchicalClustering } from 'dbvis-hc';

    const data = [ 10, 0.9, 1.0, 11, 1.1 ];
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
    const clustersAsIds = dendrogram.extractClustersAsIds();
    // clustersAsIds: [ [ 4, 1, 2 ], [ 3, 0 ] ]
```
#### Linkage Strategies

This package provides common linkage strategies:

* Single-Linkage
* Complete-Linkage
* Average-Linkage
* Average-Group-Linkage
* Centroid-Linkage

You can provide your own linkage method by subtyping the `AbstractLinkage` class.

[1]: https://onlinelibrary.wiley.com/doi/abs/10.1002/9780470316801.ch5 
