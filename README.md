# python-spfcheck2

[![build status](https://img.shields.io/travis/com/niftylettuce/python-spfcheck2.svg)](https://travis-ci.com/niftylettuce/python-spfcheck2)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/python-spfcheck2.svg)](https://codecov.io/gh/niftylettuce/python-spfcheck2)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/python-spfcheck2.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/python-spfcheck2.svg)](https://npm.im/python-spfcheck2)

> Node.js wrapper around Python's spf.check2 function which conforms to both RFC4408 and RFC7208


## Table of Contents

* [Requirements](#requirements)
* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Requirements

1. Ensure that you have a Python version of >= 3.5 installed per [pyspf][] requirements (note that Python v3 is required because of a bug with DNS recursive CNAME lookups on v2.7):

   ```sh
   python3 --version
   ```

2. Install the packages [pyspf][] and `dnspython`:

   ```sh
   pip3 install pyspf
   pip3 install dnspython
   ```


## Install

[npm][]:

```sh
npm install python-spfcheck2
```

[yarn][]:

```sh
yarn add python-spfcheck2
```


## Usage

```js
const spfCheck2 = require('python-spfcheck2');

const ip = '69.55.226.139';
const address = 'terry@wayforward.net';
const host = 'mx1.wayforward.net';

// then/catch usage
spfCheck2(ip, address, host)
  .then([result, explanation] => console.log(result, explanation))
  .catch(console.error);

// async/await usage
(async () => {
  try {
    const [ result, explanation ] = await spfCheck2(ip, address, host);
    console.log(result, explanation);
  } catch (err) {
    console.error(err);
  }
})();
```

Note that `result` is a String (which also corresponds to a particular `explanation`), see table below for the full list:

| Result      | Explanation                                 |
| ----------- | ------------------------------------------- |
| `pass`      | `sender SPF authorized`                     |
| `fail`      | `SPF fail - not authorized`                 |
| `neutral`   | `permanent error in processing`             |
| `softfail`  | `domain owner discourages use of this host` |
| `permerror` | `permanent error in processing`             |
| `temperror` | `temporary DNS error in processing`         |
| `none`      |                                             |
| `local`     | `No SPF result due to local policy`         |
| `trusted`   | `No SPF check - trusted-forwarder.org`      |
| `ambiguous` | `No error, but results may vary`            |

An error is thrown if the child process itself (`spf.check2`) errors.


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[pyspf]: https://pypi.org/project/pyspf/
