# @cookbook/dot-notation
> Object readings and complex transformations made easy by using `dot.notation.syntax[]`

[![NPM Version][npm-image]][npm-url]
[![CI Status][circleci-image]][circleci-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![GitHub stars][stars-image]][stars-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![GitHub issues][issues-image]][issues-url]
[![Awesome][awesome-image]][awesome-url]
[![install size][install-size-image]][install-size-url]
[![gzip size][gzip-size-image]][gzip-size-url]

![](dot-notation.png)

## Demo

Play around with _dot-notation_ and experience **the magic**!

[![Edit @cookbook/dot-notation](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cookbookdot-notation-kjwd2?fontsize=14&hidenavigation=1&theme=dark)

## Installation

```sh
npm install @cookbook/dot-notation --save
#or
yarn add @cookbook/dot-notation
```

## How to use

### Picking a value

```js
import { pick } from '@cookbook/dot-notation';

const source = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe'
    },
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States'
      },
    ]
  }
};

pick(source, 'person.name');
//output { firstName: 'John', lastName: 'Doe' }

pick(source, 'person.address[0].street');
//output "Infinite Loop"
```

### Parsing an object

#### Conventional parsing

```js
import { parse } from '@cookbook/dot-notation';

const source = {
  'person.name.firstName': 'John',
  'person.name.lastName': 'Doe',
  'person.address[].street': 'Infinite Loop',
  'person.address[].city': 'Cupertino',
  'person.address[].postalCode': 95014,
};

parse(source);

/* output
{
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        postalCode: 95014,
      },
    ],
  },
}
*/
```

#### With nested array

> where `[n]` represents the array index position to insert the element

```js
import { parse } from '@cookbook/dot-notation';

const source = {
  '[0].street': 'Infinite Loop',
  '[0].city': 'Cupertino',
  '[0].postalCode': 95014,
  '[1].street': '1600 Amphitheatre',
  '[1].city': 'Mountain View',
  '[1].postalCode': 94043,
  '[2][0]': 'hobbies',
  '[2][1][0]': ['coding'],
  '[2][1][1]': ['gaming'],
};

parse(source);

/* output
[
 {
  "postalCode": 95014,
  "city": "Cupertino",
  "street": "Infinite Loop"
 },
 {
  "postalCode": 94043,
  "city": "Mountain View",
  "street": "1600 Amphitheatre"
 },
 [
  "hobbies",
  [["coding"],["gaming"]]
 ]
]
*/
```

### Parsing single key


```js
import { parseKey } from '@cookbook/dot-notation';

const path = 'person.name';
const value = 'John Doe';

parseKey(path, value);

/* output
{
  person: {
    name: 'John Doe',
  },
}
*/
```

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/@cookbook/dot-notation.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cookbook/dot-notation
[npm-downloads]: https://img.shields.io/npm/dm/@cookbook/dot-notation.svg?style=flat-square
[circleci-image]: https://circleci.com/gh/the-cookbook/dot-notation.svg?style=svg
[circleci-url]: https://circleci.com/gh/the-cookbook/dot-notation
[stars-image]: https://img.shields.io/github/stars/the-cookbook/dot-notation.svg
[stars-url]: https://github.com/the-cookbook/dot-notation/stargazers
[vulnerabilities-image]: https://snyk.io/test/github/the-cookbook/dot-notation/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/the-cookbook/dot-notation
[issues-image]: https://img.shields.io/github/issues/the-cookbook/dot-notation.svg
[issues-url]: https://github.com/the-cookbook/dot-notation/issues
[awesome-image]: https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg
[awesome-url]: https://github.com/the-cookbook/dot-notation
[install-size-image]: https://packagephobia.now.sh/badge?p=@cookbook/dot-notation
[install-size-url]: https://packagephobia.now.sh/result?p=@cookbook/dot-notation
[gzip-size-image]: http://img.badgesize.io/https://unpkg.com/@cookbook/dot-notation/lib/dot.min.js?compression=gzip
[gzip-size-url]: https://unpkg.com/@cookbook/dot-notation/lib/dot.min.js
