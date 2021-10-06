import { EntryPoint } from "react-relay";
import type App from './App';
import { makeResource } from '@pokeyo/jsr.macro';
import appQuery from './__generated__/AppQuery.graphql';
import IssuesEntryPoint from "./Issues.entrypoint";
const AppEntryPoint: EntryPoint<typeof App, { owner: string, name: string }> = {
  root: makeResource(() => import("./App").then(m => m.default)),
  getPreloadProps({ owner, name }) {
    return {
      entryPoints: {
        issuesEntryPoint: {
          entryPoint: IssuesEntryPoint,
          entryPointParams: { owner, name }
        }
      },
      queries: {
        appQuery: {
          parameters: appQuery,
          variables: { owner, name }
        }
      }
    }
  }
}

export default AppEntryPoint;
