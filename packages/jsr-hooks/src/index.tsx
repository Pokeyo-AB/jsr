import { Reference } from '@pokeyo/jsr-runtime';
import { ComponentType, useCallback, useState } from 'react';

export function useResourceLoader<T>(reference: Reference<T>): [Reference<T> | null, () => Promise<void>, () => void] {
  const [loaded, setLoaded] = useState<boolean>(false);
  const load = useCallback(() => {
    const promise = reference.load().then(() => {});
    setLoaded(true);
    return promise;
  }, [reference]);

  const dispose = useCallback(() => {
    setLoaded(false);
  }, []);

  return [loaded ? reference : null, load, dispose];
}

export function ResourceContainer<T extends ComponentType<Props>, Props>(props: {reference: Reference<T>, props: Props}) {
  const Component = props.reference.get();
  if (Component != null) {
    // @ts-expect-error
    return <Component {...props.props} />
  }

  throw props.reference.load();
}
