# fastclone

fastclone is the fast way to clone datas.

## Result

```
    benchmark

                      origin x      96,536,741 ops/sec ±1.81% (83 runs sampled)
     (shallow) Object.assign x         673,915 ops/sec ±1.42% (86 runs sampled)
       (shallow) deep-assign x         397,372 ops/sec ±1.20% (83 runs sampled)
      ✓ benchmark: shallow clone plain (16799ms)

                   fastclone x          55,900 ops/sec ±1.51% (86 runs sampled)
JSON.parse(JSON.stringify()) x         208,473 ops/sec ±1.73% (89 runs sampled)
                  fast-clone x         144,334 ops/sec ±1.48% (89 runs sampled)
                       clone x         624,627 ops/sec ±2.46% (80 runs sampled)
                  clone-deep x          52,376 ops/sec ±1.39% (86 runs sampled)
                      extend x          87,863 ops/sec ±1.47% (88 runs sampled)
----------------- Fastest is :                       clone
      ✓ benchmark: deep clone plain data (32963ms)

                   fastclone x          17,255 ops/sec ±1.42% (88 runs sampled)
JSON.parse(JSON.stringify()) x          78,091 ops/sec ±1.52% (89 runs sampled)
                  fast-clone x          52,732 ops/sec ±1.48% (87 runs sampled)
                       clone x          86,323 ops/sec ±1.97% (87 runs sampled)
                  clone-deep x          52,704 ops/sec ±1.46% (83 runs sampled)
                      extend x          82,652 ops/sec ±1.67% (87 runs sampled)
----------------- Fastest is :                       clone
      ✓ benchmark: deep clone simple data (32796ms)

                   fastclone x           3,944 ops/sec ±2.74% (83 runs sampled)
JSON.parse(JSON.stringify()) x          37,644 ops/sec ±1.66% (84 runs sampled)
                  fast-clone x          26,332 ops/sec ±1.41% (88 runs sampled)
                       clone x          15,089 ops/sec ±1.72% (87 runs sampled)
                  clone-deep x          15,034 ops/sec ±1.02% (88 runs sampled)
                      extend x          87,394 ops/sec ±1.46% (88 runs sampled)
----------------- Fastest is :                      extend
      ✓ benchmark: deep clone complex data (33097ms)

                   fastclone x             339 ops/sec ±1.73% (83 runs sampled)
JSON.parse(JSON.stringify()) x           3,351 ops/sec ±1.75% (90 runs sampled)
                  fast-clone x           2,181 ops/sec ±1.45% (88 runs sampled)
                       clone x           1,443 ops/sec ±1.32% (87 runs sampled)
                  clone-deep x           1,215 ops/sec ±1.30% (89 runs sampled)
                      extend x          86,917 ops/sec ±1.61% (85 runs sampled)
----------------- Fastest is :                      extend
      ✓ benchmark: deep clone big data (32695ms)
```

## Compares

- assign-deep: deep clone object, but shallow clone array property, and not support root array.
