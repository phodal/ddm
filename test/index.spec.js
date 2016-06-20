import expect from 'expect';
import {DLM} from '../src';

describe('get object test', () => {
  it('should return 1 object', () => {
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

  it('should return correct object', () => {
    let dlm = new DLM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    dlm.get(['title', 'author']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
  });

  it('should return all objects when get array empty', () => {
    let dlm = new DLM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    dlm.get().from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
    expect(newObject.blog).toBe("fdsf asdf fadsf ");
  });
});
