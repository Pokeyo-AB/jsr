# jsr

JSR enables you to use dynamically imported ES modules synchronously if they are available. Otherwise loads them and caches them.

The purpose of jsr is to be used together with relay entrypoints as a way to load code and server data in parallel.

# Setup

At the moment jsr requires webpack as the runtime. However it should be easy to expand the support for other bundler tools if there is a request for that.

## create-react-app

CRA support is made possible because of babel-plugin-macros.

Install the jsr package `npm install @pokeyo/jsr.macro` and then use the macro import in your code.

```ts
import {makeResource} from '@pokeyo/jsr.macro';
const moduleRef = makeResource(() => import("./myModule").then(m => m.default)));
```

## babel

`npm install @pokeyo/babel-plugin-jsr @pokeyo/jsr-runtime`

`.babelrc`

```json
{
  "plugins": ["@pokeyo/jsr"]
}
```

```ts
import {makeResource} from '@pokeyo/jsr-runtime';
const moduleRef = makeResource(() => import("./myModule").then(m => m.default)));
```
