import expect from 'expect';
import {DDM} from '../src';

describe('Get', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };
  });

  it('should return 1 object', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['title']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe(undefined);
  });

  it('should return correct object', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['title', 'author']).from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
  });

  it('should return all objects when get array empty', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get().from(originObject).to(newObject);
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe("phodal");
    expect(newObject.blog).toBe("fdsf asdf fadsf ");
  });

  it('should return empty results when get no exist empty', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['tag']).from(originObject).to(newObject);
    expect(newObject.tag).toBe("");
  });
});

describe('Add', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };
  });

  it('should return 1 object', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['title'])
      .from(originObject)
      .add('tag', 'hello,world,linux')
      .to(newObject);
    expect(newObject.tag).toBe("hello,world,linux");
    expect(newObject.title).toBe("hello");
    expect(newObject.author).toBe(undefined);
  });

  it('should cover origin object when have same key', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['title'])
      .from(originObject)
      .add('blog', 'hello,world,linux')
      .to(newObject);
    expect(newObject.blog).toBe("hello,world,linux");
  });
});

describe('Remove', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };
  });

  it('should return 1 object', () => {
    let ddm = new DDM();

    var newObject = {};
    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .remove('title')
      .to(newObject);
    expect(newObject.title).toBe(undefined);
  });
});

describe('Handle', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'AAAAAAAAAAAA BBBBBBBBBBBB CCCCCCCCCCCCC DDDDDDDDDDDDDDD',
      author: 'phodal'
    };
  });

  it('should able to add custom handle event', () => {
    let ddm = new DDM();

    var newObject = {};

    function handler(blog) {
      return blog[0];
    }

    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .handle("blog", handler)
      .to(newObject);
    expect(newObject.blog).toBe('A');
  });

  it('should able to add custom multi handle event', () => {
    let ddm = new DDM();

    var newObject = {};

    function handler(blog) {
      return blog[0];
    }

    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .handle("blog", handler)
      .handle("title", handler)
      .to(newObject);
    expect(newObject.blog).toBe('A');
    expect(newObject.title).toBe('h');
  });
});

describe('Replace', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'AAAAAAAAAAAAAAA',
      author: 'phodal'
    };
  });

  it('should be able to replace field', () => {
    let ddm = new DDM();

    var newObject = {};

    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .replace("blog", "description")
      .to(newObject);
    expect(newObject.description).toBe('AAAAAAAAAAAAAAA');
    expect(newObject.blog).toBe(undefined);

    expect(JSON.stringify(newObject)).toBe('{"description":"AAAAAAAAAAAAAAA","title":"hello","author":"phodal"}');
  });
});

describe('ReplaceWithHandle', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      blog: 'AAAAAAAAAAAAAAA',
      author: 'phodal'
    };
  });

  it('should able to add custom handle event', () => {
    let ddm = new DDM();

    var newObject = {};

    function handler(blog) {
      return blog[0];
    }

    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .replaceWithHandle("blog", "description", handler)
      .to(newObject);
    expect(newObject.description).toBe('A');
    expect(newObject.blog).toBe(undefined);

    expect(JSON.stringify(newObject)).toBe('{"description":"A","title":"hello","author":"phodal"}');
  });
});

describe('Complex', () => {
  var originObject;

  beforeEach(function() {
    originObject = {
      title: 'hello',
      content: 'AAAAAAAAAAAAAAA',
      author: 'phodal',
      date: '2016-03-02'
    };
  });

  it('should able to test with multi case', () => {
    let ddm = new DDM();

    var newObject = {};

    function handler(blog) {
      return blog[0];
    }

    ddm.get(['title', 'content', 'author', 'date'])
      .from(originObject)
      .add('tag', 'zzz')
      .remove('title')
      .replace('date', 'publishdate')
      .replaceWithHandle("content", "description", handler)
      .to(newObject);
    expect(newObject.description).toBe('A');
    expect(newObject.tag).toBe('zzz');
    expect(newObject.blog).toBe(undefined);
    expect(newObject.content).toBe(undefined);
    expect(newObject.date).toBe(undefined);
    expect(newObject.publishdate).toBe("2016-03-02");

    expect(JSON.stringify(newObject)).toBe('{"tag":"zzz","publishdate":"2016-03-02","description":"A","author":"phodal"}');
  });
});
