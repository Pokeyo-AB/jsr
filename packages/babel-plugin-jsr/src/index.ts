import type { Binding, NodePath } from '@babel/traverse'
import {
  assertArrowFunctionExpression,
  assertCallExpression,
  memberExpression,
  identifier,
  isIdentifier,
  CallExpression,
  ImportDeclaration,
  callExpression,
  importDeclaration,
  importSpecifier,
  stringLiteral,
  assertProgram,
  Program,
  isLiteral,
  Identifier,
  isCallExpression
} from '@babel/types';

export default function () {
  const moduleName = "@pokeyo/jsr-runtime";
  return {
    visitor: {
      CallExpression(path: NodePath<CallExpression>) {
        if (path.get('callee').referencesImport(moduleName, "makeResource")) {
          transformJsrCall(path, "@pokeyo/jsr-runtime/dist/webpack");
        };
      }
    }
  };
}

export const transformJsrCall = (path: NodePath<CallExpression>, sourceModule: string) => {
  const programPath = path.scope.getProgramParent().path as NodePath<Program>;
  const runtimeImport = findRuntimeImport(programPath, sourceModule, "makeResource");
  const importName = runtimeImport ?? programPath.scope.generateUidIdentifier();
  const resolveWeak = memberExpression(identifier("require"), identifier("resolveWeak"));

  const arrowFunction = path.node.arguments[0];
  assertArrowFunctionExpression(arrowFunction)
  const body = arrowFunction.body;
  assertCallExpression(body);
  const arrowFunctionPath = path.get('arguments')[0];
  let importedModuleName: any = null;
  arrowFunctionPath.traverse({
    Import(importPath) {
      if (importPath.parentPath.isCallExpression() && isCallExpression(importPath.parentPath.node)) {
        importedModuleName = importPath.parentPath.node.arguments[0]
      }
    }
  }, {});

  path.node.callee = importName;
  path.node.arguments.push(callExpression(resolveWeak, [importedModuleName]));

  assertProgram(programPath.node);

  if (!runtimeImport) {
    programPath.unshiftContainer('body', createImportDeclaration(importName.name, "makeResource", sourceModule))
    programPath.scope.crawl();
  }
}

const createImportDeclaration = (local: string, imported: string, source: string): ImportDeclaration => importDeclaration([importSpecifier(identifier(local), identifier(imported))], stringLiteral(source))

const findRuntimeImport = (programPath: NodePath<Program>, source: string, imported: string): Identifier | null => {
  const binding: Binding | null = Object.values(programPath.scope.getAllBindings()).find((b: Binding) => {
    if (b.path.isImportSpecifier() && b.path.parentPath.isImportDeclaration()) {
      return b.path.parentPath.node.source.value === source && ((isLiteral(b.path.node.imported) && b.path.node.imported.value === imported) || (isIdentifier(b.path.node.imported) && b.path.node.imported.name === imported));
    }
    return false;
  });
  return binding?.identifier ?? null;
}
