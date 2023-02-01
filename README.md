# myanmar-notation

A [Node.js](#nodejs) module and a [library](#browser) which converts the given number into words in Myanmar. Following written rule and add the creaky tone on number places `10^5`, `10^6` and `10^7`. Check [live Demo][demo] is available...

[![workflows-badge]][workflows]
[![travis-badge]][travis]
[![npm-badge]][npm]
[![webpack-badge]][latest-min-unpkg]
![test-mocha]

Normally "ပေါင်း" in Myanmar translated "plus", however the same word using in a large number of amount dedicate multiply. For example
သိန်းတစ်သောင်း is `1 0000 00000` and can also/usually pronounced သိန်းပေါင်း တစ်သောင်း which mean "`(100000*10000)`", therefor "သိန်းတစ်သောင်း" and "သိန်းပေါင်း တစ်သောင်း" has dedicated the same amount. This module is using "ပေါင်း" when the dedicated amount is larger than the subsequent scale name "ခု", "ဆယ်", "ရာ", "ထောင်", "သောင်း", "သိန်း", "သန်း" and "ကု​ဋေ​".

It can be a bit confusing between "သိန်းတစ်သိန်း" and "တစ်သိန်း" as of spoken usually does

> "ငွေ သိန်းတစ်သိန်းလောက်  ချေးပေးလို့ရမလား ခင်ဗျာ"

they probabbly just wanted "100000",
but it is entirely different as "သိန်းတစ်သိန်း" mean "10000 000000" and "တစ်သိန်း" mean "100000".

There are also difference positioning scale name, primarly it is followed by the given number

> 10: "တစ်ဆယ်" 20: "နှစ်ဆယ်" 10000000: "တစ်ကု​ဋေ​"

However using this primarly structure in large amount seem very weird, eg.100000000: "တစ်ထောင်သိန်း", "တစ်ရာသန်း", "တစ်ဆယ်ကု​ဋေ​", therefore in such amount the scale name lead the number to take away this weirdness.

> 100000000: "သိန်းတစ်ထောင်", "သန်းတစ်ရာ", "ကု​ဋေ​တစ်ဆယ်"

## Feature

- [x] Decimals are rounded (floor)
- [x] Query `get(2700)`, `get('၂၇၀၀')`, `get('27,000,000.00')` ,`get('5.23e+8')` is flexible
- [x] [Demo][demo]
- [x] mocha
- [x] webpack

## Usage

### Node.JS

> Oops: `myanmar-notation` export ES module from CommonJS built version.

```js
export * from "./index.js";

import * as e from "./index.js";
export default e;
```

`npm i myanmar-notation` can be `require` or `import` from your Node.JS application. However `myanmar-notation` is assuming that one day npm might force us to seperate ES module and CommonJS. Therefore, it is a good practice to start coding Node.JS application using ES module.

```js
// ES6
import myanmarNotation from 'myanmar-notation';
import {get} from 'myanmar-notation';

myanmarNotation.get(2700);
// myanmarNotation.multiplication(5);
// myanmarNotation.keep(123);
// myanmarNotation.turn('၄၅၆');
get(12345678);

// CommonJS
const myanmarNotation = require('myanmar-notation');
const {get} = require('myanmar-notation');

myanmarNotation.get(2700);
get(12345678);
```

### Browser

Include the file `myanmar-notation@latest/min.js` in your web application. It is available on [UNPKG][unpkg] and [jsDelivr][jsdelivr].

- [https://cdn.jsdelivr.net/npm/ttfmeta@latest/min.js][latest-min-unpkg]
- [https://unpkg.com/ttfmeta@latest/min.js][latest-min-jsdelivr]

Now let's assume that you have picked the [jsDelivr][latest-min-jsdelivr] one...

```html
<script src="https://cdn.jsdelivr.net/npm/ttfmeta@latest/min.js"></script>
<script>
let notation = window.myanmarNotation;
</script>
```

## API

You may assure that the *API*s are not going to change without a good reason for end user. So any exported `methods` and `classes` **name** will stays the same as the *last* updates.

- [myanmar-notation](#myanmar-notation)
  - [Feature](#feature)
  - [Usage](#usage)
    - [Node.JS](#nodejs)
    - [Browser](#browser)
  - [API](#api)
    - [Multiplication](#multiplication)
    - [Keep](#keep)
    - [Turn](#turn)
    - [get](#get)
  - [License](#license)

### Multiplication

the `notation.multiplication()` construct the given len to zero ending, it takes 2 arguments `(len, head='1')`, second argument is optional and return the result as string.

```js
notation.multiplication(5,'10');
> "100000"
```

### Keep

the `notation.keep()` convert the given string(number) to Burmese number and return the result as string.

```js
notation.keep(1234567);
> "၁၂၃၄၅၆၇"

notation.keep('a567');
> "a၅၆၇"
```

### Turn

the `notation.turn()` convert the given string(number) to English number and return the result as string.

```js
notation.turn('၁၂၃၄၅၆၇');
> "1234567"

notation.turn('123၅၆၇');
> "123567"
```

### get

the `notation.get()` return an object if there is a sense in get query, otherwise empty Object return.

```js
notation.get(2700);
// return
>  {
    "number": "၂၇၀၀",
    "digit": "2700",
    "notation": [
      {
        "sense": "နှစ်ထောင့်ခုနစ်ရာ"
      }
    ]
  }

notation.get(12345678);
// return
>  {
    "number": "၁၂၃၄၅၆၇၈",
    "digit": "12345678",
    "notation": [
      {
        "sense": "သိန်းတစ်ရာ့နှစ်ဆယ့်သုံး လေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 5,
        "size": 8,
        "list": [
          "123",
          "45678"
        ]
      },
      {
        "sense": "သန်းတစ်ဆယ့်နှစ် သုံးသိန်းလေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 6,
        "size": 8,
        "list": [
          "12",
          "345678"
        ]
      },
      {
        "sense": "တစ်ကု​ဋေ​ နှစ်သန်းသုံးသိန်းလေးသောင်းငါးထောင့်ခြောက်ရာ့ခုနစ်ဆယ့်ရှစ်",
        "rule": 7,
        "size": 8,
        "list": [
          "1",
          "2345678"
        ]
      }
    ]
  }
```

## License

![shield-license]

[demo]: https://khensolomon.github.io/myanmar-notation/
[workflows-badge]: https://github.com/khensolomon/myanmar-notation/workflows/Node/badge.svg
[workflows]: https://github.com/khensolomon/myanmar-notation/actions/workflows/node.yml
[test-mocha]: https://img.shields.io/badge/test-mocha-green.svg?longCache=true
[webpack-badge]: https://img.shields.io/badge/webpack-yes-green.svg?longCache=true

[unpkg]: https://unpkg.com/
[latest-min-unpkg]: https://unpkg.com/myanmar-notation@latest/min.js
[jsdelivr]: https://www.jsdelivr.com/
[latest-min-jsdelivr]: https://cdn.jsdelivr.net/npm/myanmar-notation@latest/min.js

[travis-badge]: https://app.travis-ci.com/khensolomon/myanmar-notation.svg?branch=master
[travis]: https://app.travis-ci.com/khensolomon/myanmar-notation
[npm-badge]: https://img.shields.io/npm/dt/myanmar-notation.svg
[npm]: https://www.npmjs.com/package/myanmar-notation
[shield-license]: https://img.shields.io/github/license/khensolomon/myanmar-notation?style=social
