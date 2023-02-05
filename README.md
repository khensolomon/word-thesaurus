# word-thesaurus

A [Node.js](#nodejs) module for word thesaurus from [hunspell/mythes](https://github.com/hunspell/mythes) (<http://www.openoffice.org/lingucomponent/thesaurus.html>)

[![workflows-badge]][workflows]
[![travis-badge]][travis]
[![npm-badge]][npm]
[![webpack-badge]][latest-min-unpkg]
![test-mocha]

## Feature

- [x] has TypeScript declarations
- [x] support both ESM and CommonJS

## Usage

### Node.JS

> Oops: `word-thesaurus` export ES module from CommonJS built version.

`npm i word-thesaurus` can be `require` or `import` from your Node.JS application. However `word-thesaurus` is assuming that one day npm might force us to seperate ES module and CommonJS. Therefore, it is a good practice to start coding Node.JS application using ES module.

```js
// ES6
import thesaurus from 'word-thesaurus';

thesaurus.search("rapid");
// return
[
  {
    pos: 2,
    raw: [
      'fast',       'accelerated',   'accelerating',
      'alacritous', 'blistering',    'hot',
      'red-hot',    'double-quick',  'express',
      'fleet',      'swift',         'hastening',
      'high-speed', 'high-velocity', 'hurrying',
      'scurrying',  'immediate',     'prompt',
      'quick',      'straightaway',  'instantaneous',
      'instant',    'meteoric',      'speedy',
      'rapid',      'speeding',      'fast-breaking',
      'fast-paced', 'winged',        'expedited',
      'hurried',    'sudden'
    ]
  },
  { pos: 0, raw: [ 'waterway' ] }
]
```

```js
// CommonJS
const thesaurus = require('word-thesaurus');

thesaurus.find("rapid");
// return
[
  { pos: 2, raw: [ 'fast', 'speedy' ] },
  { pos: 0, raw: [ 'waterway' ] }
]
```

## API

You may assure that the *API*s are not going to change without a good reason for end user. So any exported `methods` and `classes` **name** will stays the same as the *last* updates.

- [word-thesaurus](#word-thesaurus)
  - [Feature](#feature)
  - [Usage](#usage)
    - [Node.JS](#nodejs)
  - [API](#api)
    - [File](#file)
    - [Load](#load)
    - [Find](#find)
    - [Search](#search)
    - [posName](#posname)
  - [License](#license)

### File

the `thesaurus.src.file` source file get or set.

```js
// get default source file
thesaurus.src.file
> "./src/thesaurus.dat"

// set custom source file
thesaurus.src.file = "./other/thesaurus.dat"
> "./other/thesaurus.dat"
```

### Load

the `thesaurus.load(options)` generate object from source file, it takes 1 argument `({save?:boolean; space?:number})`, if `options.save:true`; save as `*-data.json`.

```js
// save generated object as formated .json
thesaurus.load({save:true, space:2}) - format and save

// save generated object as minify .json
thesaurus.load({save:true})
```

### Find

the `thesaurus.find(keyword)` get thesaurus result for `keyword`

```js
thesaurus.find("waterway");
// return
[ 
  { 
    pos: 0,
    raw: [ 'body of water', 'water', 'watercourse', 'way' ]
  }
]
```

### Search

the `thesaurus.search(keyword)` get search result for `keyword`

```js
thesaurus.search("waterway");
// return
[
  {
    pos: 0,
    raw: [
      'watercourse',   'waterway',
      'ditch',         'flume',
      'headrace',      'mare clausum',
      'mare liberum',  'rapid',
      'tailrace',      'way',
      'body of water', 'water'
    ]
  }
]
```

### posName

the `thesaurus.posName()` get part of speech by index

```js
thesaurus.posName(0);
// return
>  Noun

thesaurus.posName(1);
// return
>  Verb
```

## License

![shield-license]

[demo]: https://khensolomon.github.io/word-thesaurus/
[workflows-badge]: https://github.com/khensolomon/word-thesaurus/workflows/Node/badge.svg
[workflows]: https://github.com/khensolomon/word-thesaurus/actions/workflows/node.yml
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-badge]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true

[unpkg]: https://unpkg.com/
[latest-min-unpkg]: https://unpkg.com/word-thesaurus@latest/min.js
[jsdelivr]: https://www.jsdelivr.com/
[latest-min-jsdelivr]: https://cdn.jsdelivr.net/npm/word-thesaurus@latest/min.js

[travis-badge]: https://app.travis-ci.com/khensolomon/word-thesaurus.svg?branch=master
[travis]: https://app.travis-ci.com/khensolomon/word-thesaurus
[npm-badge]: https://img.shields.io/npm/dt/word-thesaurus.svg
[npm]: https://www.npmjs.com/package/word-thesaurus
[shield-license]: https://img.shields.io/github/license/khensolomon/word-thesaurus?style=social
