import { makeResource } from "@pokeyo/jsr.macro";
import { EntryPoint } from "react-relay";
import type Issues from "./Issues";
import IssuesQuery from './__generated__/IssuesQuery.graphql';

const IssuesEntryPoint: EntryPoint<typeof Issues, { owner: string, name: string }> = {
  root: makeResource(() => import("./Issues").then((m) => m.default)),
  getPreloadProps({ owner, name }) {
    return {
      queries: {
        issuesQuery: {
          parameters: IssuesQuery,
          variables: { owner, name }
        }
      }
    }
  }
}

export default IssuesEntryPoint;
