import './App.css';
import { EntryPointComponent, EntryPointContainer, usePreloadedQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';
import type {AppQuery} from './__generated__/AppQuery.graphql';
import type IssuesEntryPoint from './Issues.entrypoint';
import { Suspense } from 'react';

const App: EntryPointComponent<{appQuery: AppQuery}, {
  issuesEntryPoint: typeof IssuesEntryPoint
}, {}, {}> = ({ queries, entryPoints }) => {
  const query = usePreloadedQuery(graphql`
    query AppQuery($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        name
        homepageUrl
      }
    }
  `, queries.appQuery);

  return (
    <div className="App">
      <header className="App-header">
        {query.repository != null && <a
          className="App-link"
          href={"" + query.repository.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {query.repository.name}
        </a>}
        <Suspense fallback="Loading issues...">
          <EntryPointContainer entryPointReference={entryPoints.issuesEntryPoint} props={{}} />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
