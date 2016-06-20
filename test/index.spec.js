import expect from 'expect';
import {DLM} from '../src';

describe('add', () => {
  it('should add 2 and 2', () => {
    let dlm = new DLM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    dlm.get(['title']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
  });
});
