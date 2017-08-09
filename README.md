# ng-cli-electron

> Build an electron project scaffolded in `@angular/cli`

This is an extention/plugin which allows `@angular/cli` users to create electron apps. It was made to address this:

[#4227](https://github.com/angular/angular-cli/issues/4227#issuecomment-275548444)

## Install

```sh
$ npm install ng-cli-electron
```

## Usage
The commands are similar to `@angular/cli`'s own ones.

### Build

Add the following in your `scripts` section inside `package.json`:

```
"build-electron": "nge build"
```

### Serve
Add the following in your `scripts` section inside `package.json`:

```
"serve-electron": "nge serve"
```
