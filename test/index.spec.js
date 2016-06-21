import expect from 'expect';
import {DDM} from '../src';

describe('get object test', () => {
  it('should return 1 object', () => {
    let ddm = new DDM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    ddm.get(['title']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe(undefined);
  });

  it('should return correct object', () => {
    let ddm = new DDM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    ddm.get(['title', 'author']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
  });

  it('should return all objects when get array empty', () => {
    let ddm = new DDM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    ddm.get().from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
    expect(newObject.blog).toBe("fdsf asdf fadsf ");
  });
});

describe('add object test', () => {
  it('should return 1 object', () => {
    let ddm = new DDM();
    var originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };

    var newObject = {};
    ddm.get(['title'])
      .from(originObject)
      .add('tag', 'hello,world,linux')
      .to(newObject);
    expect(newObject.tag).toBe("hello,world,linux");
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe(undefined);
  });
});
