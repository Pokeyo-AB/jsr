import { Network, RecordSource, Store } from "relay-runtime";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

export const environment = new RelayModernEnvironment({
  network: Network.create((operation, variables) => {
    const TOKEN = process.env.REACT_APP_AUTH_TOKEN;
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then(response => response.json());
  }),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10
  })
})

export const environmentProvider = {
  getEnvironment: () => environment
}
