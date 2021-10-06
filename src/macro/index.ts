import { NodePath } from '@babel/traverse';
import { assertCallExpression, CallExpression } from '@babel/types';
import { createMacro } from 'babel-plugin-macros';
import { Reference } from '..';
import { transformJsrCall } from '../babel/plugin';


export type { Reference };

type MakeResourceFn = <T>(loader: () => Promise<T>) => Reference<T>

export default createMacro(({ references, state, babel, config }) => {
  references.default.forEach((path) => {
    assertCallExpression(path.parent);
    transformJsrCall(path.parentPath as NodePath<CallExpression>, "@pokeyo/jsr/runtime/webpack");
  });
}) as MakeResourceFn;
