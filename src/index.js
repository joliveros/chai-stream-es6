import highland from 'highland'; // eslint-disable-line
import assert from './assert';
import expect from './expect';

function chaiStream(chai, utils) {
  assert(chai, utils);
  expect(chai, utils);
}

export default chaiStream;
