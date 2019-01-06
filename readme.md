<div align="center">
  <img src="shots/logo.png" alt="bundt" height="120" />
</div>

<div align="center">
  <a href="https://npmjs.org/package/bundt">
    <img src="https://badgen.now.sh/npm/v/bundt" alt="version" />
  </a>
  <a href="https://travis-ci.org/lukeed/bundt">
    <img src="https://badgen.now.sh/travis/lukeed/bundt" alt="travis" />
  </a>
  <a href="https://npmjs.org/package/bundt">
    <img src="https://badgen.now.sh/npm/dm/bundt" alt="downloads" />
  </a>
  <a href="https://packagephobia.now.sh/result?p=bundt">
    <img src="https://packagephobia.now.sh/badge?p=bundt" alt="install size" />
  </a>
</div>

<div align="center">A simple bundler for your delcious modules~!</div>

## Features

* Release CommonJS, ES Module, and UMD targets
* Easily configured through your `package.json`
* Optionally control Terser settings

***Gotchas***

Your code is prepared for release targets ***as written***!

* Does not transpile your code<br>_AKA – no Babel or Buble_
* Does not inline dependencies<br>_AKA – no Rollup or Webpack_

If you need either of these, using [`microbundle`](https://github.com/developit/microbundle) comes ***highly recommend***~!

> Seriously, I write wonky ES5 code in a single file...<br>`bundt` only puts a name to the builder script I copy & paste between libraries.<br>You are 99.9999% more likely to do better with `microbundle` and/or to not outgrow it.

## Install

```
$ npm install --save-dev bundt
```


## Usage

```sh
# display help text
$ bundt --help

# build with "lib/index.js" as your entry file
$ bundt lib/index.js

# build with "src/index.js" (default)
$ bundt
```


## Configuration

Most configuration lives within your `package.json` file. The following keys are evaluated:

* **"main"** &mdash; the destination for your CommonJS file<br>_Defaults to `dist/{pkg.name}.js` – always built!_

* **"module"** &mdash; the destination for your ES Module file<br>_A ESM file will not be built if unspecified!_

* **"unpkg"** or **"umd:main"** &mdash; the destination for your UMD file<br>_A UMD file will not be built if unspecified!_

* **"umd:name"** or **"name"** &mdash; the globally exposed name for your UMD factory<br>_You should use an alternate `umd:name` if your `name` is not alphanumeric!_

* **"terser"** &mdash; custom [Terser options](https://github.com/terser-js/terser#minify-options) for minification<br>_Alternatively, you may use a `.terserrc` file~!_


## License

MIT © [Luke Edwards](https://lukeed.com)