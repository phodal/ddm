Domain Double Model
===

[![Build Status](https://travis-ci.org/phodal/ddm.svg?branch=master)](https://travis-ci.org/phodal/ddm)
[![Test Coverage](https://codeclimate.com/github/phodal/ddm/badges/coverage.svg)](https://codeclimate.com/github/phodal/ddm/coverage)
[![Code Climate](https://codeclimate.com/github/phodal/ddm/badges/gpa.svg)](https://codeclimate.com/github/phodal/ddm)

> A simple library for Front-End Bounded Context Model.

Install
---

Bower:

    bower install ddm
    
NPM:
    
    npm install ddm
    
Usage
---

Usage:

    var ddm = new DDM();

    originObject = {
      title: 'hello',
      blog: 'fdsf asdf fadsf ',
      author: 'phodal'
    };
    var newObject = {};

Basic Example:
    
   
    ddm.get(['title']).from(originObject).to(newObject);

Result
    
> {title: "hello"}

With Remove:


    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .remove('title')
      .to(newObject);


Result: 

>  {blog: "fdsf asdf fadsf ", author: "phodal"}

With Add:

    ddm.get(['title'])
      .from(originObject)
      .add('tag', 'hello,world,linux')
      .to(newObject);

Result:

> {tag: "hello,world,linux", title: "hello"}

With Custom Handle:

    function handler(blog) {
      return blog[0];
    }

    ddm.get(['title', 'blog', 'author'])
      .from(originObject)
      .handle("blog", handler)
      .to(newObject);

> {title: "hello", blog: "A", author: "phodal"}

DDM
---

![Sketch](./imgs/sketch.png)
 
![DDM](./imgs/ddm.png) 

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2016 [Phodal Huang](https://www.phodal.com). This code is distributed under the MIT License. See `LICENSE` in this directory.

[![待我代码编成,娶你为妻可好](http://brand.phodal.com/slogan/slogan.svg)](http://www.xuntayizhan.com/person/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)

