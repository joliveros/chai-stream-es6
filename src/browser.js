import chaiAsPromised from 'chai-as-promised'; // eslint-disable-line
import chaiStream from './index'; // eslint-disable-line

(() => { // eslint-disable-line
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(() => chaiAsPromised);
  } else {
    chai.use(chaiAsPromised);
    self.chaiAsPromised = chaiAsPromised;
  }
});
