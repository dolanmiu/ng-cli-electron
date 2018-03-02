[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Known Vulnerabilities][snky-image]][snky-url]

# ng-cli-electron

> Build an electron project scaffolded in `@angular/cli`

This is an extention/plugin which allows `@angular/cli` users to create electron apps. It was made to address this:

[#4227](https://github.com/angular/angular-cli/issues/4227#issuecomment-275548444)

## Install

```sh
$ npm install ng-cli-electron electron awesome-typescript-loader --save
```

## Usage
The commands are similar to `@angular/cli`'s own ones.

### Build

Add the following in your `scripts` section inside `package.json`:

```
"build-electron": "nge build"
```

If you **only** want to build the `main` part of Electron:

```
"build-electron-main": "nge build --main"
```

#### Using `@angular/cli` build flags

You can use a **subset** of the build flags [here](https://github.com/angular/angular-cli/wiki/build#options)

More specifically:
  * `aot`
  * `app`
  * `deploy-url`
  * `environment`
  * `extract-css`
  * `force`
  * `i18n-file`
  * `i18n-format`
  * `locale`
  * `missing-translation`
  * `output-hashing`
  * `progress`
  * `sourcemap`
  * `target`
  * `vendor-chunk`
  * `common-chunk`
  * `verbose`

### Serve
Add the following in your `scripts` section inside `package.json`:

```
"serve-electron": "nge serve"
```

### Help
```
nge --help
```
-----

Made with 💖 by Dolan

[travis-image]: https://travis-ci.org/dolanmiu/ng-cli-electron.svg?branch=master
[travis-url]: https://travis-ci.org/dolanmiu/ng-cli-electron
[daviddm-image]: https://david-dm.org/dolanmiu/ng-cli-electron.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/dolanmiu/ng-cli-electron
[snky-image]: https://snyk.io/test/github/dolanmiu/ng-cli-electron/badge.svg
[snky-url]: https://snyk.io/test/github/dolanmiu/ng-cli-electron
