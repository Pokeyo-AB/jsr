import { NodePath } from '@babel/traverse';
import { assertCallExpression, CallExpression } from '@babel/types';
import { createMacro } from 'babel-plugin-macros';
import { Reference } from '@pokeyo/jsr-runtime';
import { transformJsrCall } from '@pokeyo/babel-plugin-jsr';


export type { Reference };

type MakeResourceFn = <T>(loader: () => Promise<T>) => Reference<T>

// @ts-expect-error
export const makeResource: MakeResourceFn = () => { };

export default createMacro(({ references, state, babel, config }) => {
  if (references.makeResource) {
    references.makeResource.forEach((path) => {
      assertCallExpression(path.parent);
      transformJsrCall(path.parentPath as NodePath<CallExpression>, "@pokeyo/jsr-runtime/dist/webpack");
    });
  }
});
