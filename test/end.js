import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import highland from 'highland';
import fs from 'fs';
import path from 'path';

chai.use(chaiAsPromised);

const TestCases = [
  {
    name: 'an empty stream',
    factory: () => highland([]),
    canEnd: true,
    isReadable: true,
  },
  {
    name: 'a file',
    factory: () => fs.createReadStream(path.resolve(__dirname, './fixtures/empty_file')),
    canEnd: true,
    isReadable: true,
  },
  {
    name: 'a transform stream',
    factory: () => highland(),
    canEnd: false,
    isReadable: true,
  },
  {
    name: 'a writable stream',
    factory: () => fs.createWriteStream('/dev/null'),
    canEnd: false,
    isReadable: false,
  },
];

describe('assert', () => {
  const { assert } = chai;

  describe('.streamWillEnd', () => {
    TestCases.forEach((testCase) => {
      if (testCase.canEnd && testCase.isReadable) {
        it(`should return a promise will be resolved when ${testCase.name} arrived`, () => {
          const promise = assert.streamWillEnd(testCase.factory());
          return assert.isFulfilled(promise);
        });
        return;
      }

      it(`should return a promise will be rejected when ${testCase.name} arrived`, () => {
        const promise = assert.streamWillEnd(testCase.factory());
        return assert.isRejected(promise);
      });
    });
  });

  describe('.streamWillNotEnd', () => {
    TestCases.forEach((testCase) => {
      if (!testCase.canEnd && testCase.isReadable) {
        it(`should return a promise will be resolved when ${testCase.name} arrived`, () => {
          const promise = assert.streamWillNotEnd(testCase.factory());
          return assert.isFulfilled(promise);
        });
        return;
      }

      it(`should return a promise will be rejected when ${testCase.name} arrived`, () => {
        const promise = assert.streamWillNotEnd(testCase.factory());
        return assert.isRejected(promise);
      });
    });
  });
});

describe('expect(obj)', () => {
  const { expect } = chai;

  describe('.to.end', () => {
    TestCases.forEach((testCase) => {
      if (testCase.canEnd && testCase.isReadable) {
        it(`should pass when ${testCase.name} that can end`, () => {
          const promise = expect(testCase.factory()).to.end;
          return expect(promise).to.be.fulfilled;
        });
        return;
      }

      it(`should throw an Assertion Error when ${testCase.name} that cannot end`, () => {
        const promise = expect(testCase.factory()).to.end;
        return expect(promise).to.be.rejected;
      });
    });
  });

  describe('.to.not.end', () => {
    TestCases.forEach((testCase) => {
      if (!testCase.canEnd && testCase.isReadable) {
        it(`should pass when ${testCase.name} that can end`, () => {
          const promise = expect(testCase.factory()).to.not.end;
          return expect(promise).to.be.fulfilled;
        });
        return;
      }

      it(`should throw an Assertion Error when ${testCase.name} that cannot end`, () => {
        const promise = expect(testCase.factory()).to.not.end;
        return expect(promise).to.be.rejected;
      });
    });
  });
});
