export type Reference<T> = {
  getModuleId: () => string;
  isLoaded: () => boolean;
  load: () => Promise<T>;
  get: () => T | null;
}

export function makeResource<T>(loader: () => Promise<T>): Reference<T> {
  throw new Error("Expected this to be compiled");
}
