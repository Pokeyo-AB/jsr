import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { IssueList_repository$key } from "./__generated__/IssueList_repository.graphql";

export default function IssueList(props: {repository: IssueList_repository$key | null}) {
  const {data: repository} = usePaginationFragment(graphql`
    fragment IssueList_repository on Repository
      @refetchable(queryName: "IssueListPaginationQuery")
      @argumentDefinitions(first: {
        type: "Int",
        defaultValue: 10
      }, after: {
      type: "String",
      defaultValue: null
    }) {
      issues(first: $first, after: $after) @connection(key: "IssueList_issues") {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `, props.repository);



  return (<ul>
    {repository?.issues.edges?.map(edge => (<li>{edge?.node?.title}</li>))}
  </ul>);
}
