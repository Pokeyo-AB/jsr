import { transformSync } from "@babel/core";
import plugin from "../plugin";
test("plugin", () => {
  const result = transformSync(
    `
  import {makeResource as pre} from '@pokeyo/jsr';

  const isLoaded = pre(() => import("./Helloworld")).isLoaded();
  const isLoaded2 = pre(() => import("./Helloworld2").then(m => m.default)).isLoaded();
  `,
    {
      plugins: [[plugin]],
    }
  );

  expect(result?.code).toMatchInlineSnapshot(`
    "import { makeResource as _temp } from \\"@pokeyo/jsr/runtime/webpack\\";
    import { makeResource as pre } from '@pokeyo/jsr';

    const isLoaded = _temp(() => import(\\"./Helloworld\\"), require.resolveWeak(\\"./Helloworld\\")).isLoaded();

    const isLoaded2 = _temp(() => import(\\"./Helloworld2\\").then(m => m.default), require.resolveWeak(\\"./Helloworld2\\")).isLoaded();"
  `);
});
