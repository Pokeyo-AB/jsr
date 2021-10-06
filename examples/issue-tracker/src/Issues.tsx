import { graphql } from "babel-plugin-relay/macro";
import { EntryPointComponent, usePreloadedQuery } from "react-relay";
import IssueList from "./IssueList";
import type { IssuesQuery } from "./__generated__/IssuesQuery.graphql";

const Issues: EntryPointComponent<{issuesQuery: IssuesQuery}, {}, {}, {}> = ({ queries }) => {
  const query = usePreloadedQuery(graphql`
    query IssuesQuery($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        ...IssueList_repository
      }
    }
  `, queries.issuesQuery);

  return <IssueList repository={query.repository} />;
}

export default Issues;
