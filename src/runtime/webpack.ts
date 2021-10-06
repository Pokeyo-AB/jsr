import { Reference } from "..";


export function makeResource<T>(loader: () => Promise<T>, moduleId: string | number): Reference<T> {

  let error: unknown | null = null;

  // @ts-expect-error
  const isLoaded = () => __webpack_modules__.hasOwnProperty(moduleId);
  const get = () => {
    if (error) throw error
    // @ts-expect-error
    return isLoaded() ? __webpack_require__(moduleId).default : null
  };

  let promise: Promise<T> | null = null;
  const load = () => promise ?? (promise = loader().then(get, (err) => {
    // on network error we clear promise cache
    promise = null;
    throw err;
  }).catch((err) => {
    // catch all errors
    error = err;
    throw err;
  }));

  return {
    isLoaded,
    get,
    load
  }
}
