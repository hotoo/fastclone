'use strict';

const Benchmark = require('benchmark');
require('should');

// deep
const fastclone = require('../lib/fastclone');
const fastClone = require('fast-clone');
const clone = require('clone');
const cloneDeep = require('clone-deep');
const extend = require('extend');

// shallow
const objectAssign = require('object-assign');
const deepAssign = require('deep-assign');
const jsonAssign = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};
// Object.assign


const plain = require('./fixtures/plain.json');
const simple = require('./fixtures/simple.json');
const complex = require('./fixtures/complex.json');
const big = require('./fixtures/big.json');


describe('test/fastclone.test.js', function() {
  describe('deep clone', function() {
    function deepAssert(cloneSimple, cloneComplex) {
      simple[0].num.should.eql(0);
      complex.arr[0].should.eql(0);
      cloneSimple[0].num.should.eql(0);
      cloneComplex.arr[0].should.eql(0);

      simple.should.not.equal(cloneSimple);
      complex.should.not.equal(cloneComplex);

      cloneSimple[0].num = 'changed';
      cloneComplex.arr[0] = 'changed';
      simple[0].num.should.eql(0);
      complex.arr[0].should.eql(0);
      cloneSimple[0].num.should.eql('changed');
      cloneComplex.arr[0].should.eql('changed');
    }

    it('../lib/fastclone.js', function() {
      const cloneSimple = fastclone(simple);
      const cloneComplex = fastclone(complex);
      deepAssert(cloneSimple, cloneComplex);
    });

    it('fast-clone', function() {
      const cloneSimple = fastClone(simple);
      const cloneComplex = fastClone(complex);
      deepAssert(cloneSimple, cloneComplex);
    });

    it('clone', function() {
      const cloneSimple = clone(simple, false);
      const cloneComplex = clone(complex, false);
      deepAssert(cloneSimple, cloneComplex);
    });

    it('clone-deep', function() {
      const cloneSimple = cloneDeep(simple);
      const cloneComplex = cloneDeep(complex);
      deepAssert(cloneSimple, cloneComplex);
    });

    it('extend', function() {
      const cloneSimple = extend(true, {}, simple);
      const cloneComplex = extend(true, {}, complex);
      deepAssert(cloneSimple, cloneComplex);
    });

    it('JSON.parse(JSON.stringify(obj))', function() {
      const cloneSimple = jsonAssign(simple);
      const cloneComplex = jsonAssign(complex);
      deepAssert(cloneSimple, cloneComplex);
    });
  });

  describe('shallow clone', function() {
    afterEach(function() {
      simple[0].num = 0;
      complex.arr[0] = 0;
    });
    function shallowAssert(cloneSimple, cloneComplex) {
      simple[0].num.should.eql(0);
      complex.arr[0].should.eql(0);
      cloneSimple[0].num.should.eql(0);
      cloneComplex.arr[0].should.eql(0);

      simple.should.not.equal(cloneSimple);
      complex.should.not.equal(cloneComplex);
      simple[0].should.equal(cloneSimple[0]);
      complex.arr.should.equal(cloneComplex.arr);

      cloneSimple[0].num = 'changed';
      cloneComplex.arr[0] = 'changed';
      simple[0].num.should.eql('changed');
      complex.arr[0].should.eql('changed');
      cloneSimple[0].num.should.eql('changed');
      cloneComplex.arr[0].should.eql('changed');
    }

    it('Object.assign', function() {
      const cloneSimple = Object.assign({}, simple);
      const cloneComplex = Object.assign({}, complex);
      shallowAssert(cloneSimple, cloneComplex);
    });

    it('object-assign', function() {
      const cloneSimple = objectAssign({}, simple);
      const cloneComplex = objectAssign({}, complex);
      shallowAssert(cloneSimple, cloneComplex);
    });

    it('deep-assign', function() {
      const cloneSimple = deepAssign({}, simple);
      const cloneComplex = deepAssign({}, complex);
      shallowAssert(cloneSimple, cloneComplex);
    });
  });

  describe('benchmark', function() {
    this.timeout(120 * 1000);

    it('benchmark: shallow clone plain', function(done) {
      console.log();
      const suite = new Benchmark.Suite();
      suite
      .add('                      origin', function() {
        return plain;
      })
      .add('     (shallow) Object.assign', function() {
        return Object.assign({}, plain);
      })
      .add('       (shallow) deep-assign', function() {
        return deepAssign({}, plain);
      })
      .on('cycle', function(event) {
        console.log(formatBenchmark(String(event.target)));
      })
      .on('complete', () => {
        done();
      })
      .run();
    });

    it('benchmark: deep clone plain data', function(done) {
      console.log();
      const suite = new Benchmark.Suite();
      suite
      .add('                   fastclone', function() {
        return fastclone(plain);
      })
      .add('JSON.parse(JSON.stringify())', function() {
        return jsonAssign(plain);
      })
      .add('                  fast-clone', function() {
        return fastClone(plain);
      })
      .add('                       clone', function() {
        return clone(plain, false);
      })
      .add('                  clone-deep', function() {
        return cloneDeep(simple);
      })
      .add('                      extend', function() {
        return extend(true, {}, simple);
      })
      .on('cycle', function(event) {
        console.log(formatBenchmark(String(event.target)));
      })
      .on('complete', function() {
        console.log('----------------- Fastest is :' + this.filter('fastest').map('name'));
        done();
      })
      .run();
    });

    it('benchmark: deep clone simple data', function(done) {
      console.log();
      const suite = new Benchmark.Suite();
      suite
      .add('                   fastclone', function() {
        return fastclone(simple);
      })
      .add('JSON.parse(JSON.stringify())', function() {
        return jsonAssign(simple);
      })
      .add('                  fast-clone', function() {
        return fastClone(simple);
      })
      .add('                       clone', function() {
        return clone(simple, false);
      })
      .add('                  clone-deep', function() {
        return cloneDeep(simple);
      })
      .add('                      extend', function() {
        return extend(true, {}, simple);
      })
      .on('cycle', function(event) {
        console.log(formatBenchmark(String(event.target)));
      })
      .on('complete', function() {
        console.log('----------------- Fastest is :' + this.filter('fastest').map('name'));
        done();
      })
      .run();
    });

    it('benchmark: deep clone complex data', function(done) {
      console.log();
      const suite = new Benchmark.Suite();
      suite
      .add('                   fastclone', function() {
        return fastclone(complex);
      })
      .add('JSON.parse(JSON.stringify())', function() {
        return jsonAssign(complex);
      })
      .add('                  fast-clone', function() {
        return fastClone(complex);
      })
      .add('                       clone', function() {
        return clone(complex, false);
      })
      .add('                  clone-deep', function() {
        return cloneDeep(complex, false);
      })
      .add('                      extend', function() {
        return extend(true, {}, simple);
      })
      .on('cycle', function(event) {
        console.log(formatBenchmark(String(event.target)));
      })
      .on('complete', function() {
        console.log('----------------- Fastest is :' + this.filter('fastest').map('name'));
        done();
      })
      .run();
    });

    it('benchmark: deep clone big data', function(done) {
      console.log();
      const suite = new Benchmark.Suite();
      suite
      .add('                   fastclone', function() {
        return fastclone(big);
      })
      .add('JSON.parse(JSON.stringify())', function() {
        return jsonAssign(big);
      })
      .add('                  fast-clone', function() {
        return fastClone(big);
      })
      .add('                       clone', function() {
        return clone(big, false);
      })
      .add('                  clone-deep', function() {
        return cloneDeep(big, false);
      })
      .add('                      extend', function() {
        return extend(true, {}, simple);
      })
      .on('cycle', function(event) {
        console.log(formatBenchmark(String(event.target)));
      })
      .on('complete', function() {
        console.log('----------------- Fastest is :' + this.filter('fastest').map('name'));
        done();
      })
      .run();
    });

  });
});

function formatBenchmark(output) {
  return output.replace(/ x ([\d,]+)/, function($0, $1) {
    return ' x ' + (' '.repeat(15 - $1.length)) + $1;
  });
}
