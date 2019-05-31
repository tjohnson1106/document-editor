import React from "react";

import { SyncingEditor } from "./components/SyncingEditor";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { GroupEditor } from "./components/GroupEditor";

const App = () => {
  return (
    <Router>
      <Route
        path="/"
        exact
        render={() => {
          return <Redirect to={`/group/${Date.now()}`} />;
        }}
      />
      <Route path="/group/:id" component={GroupEditor} />
    </Router>
  );
};

export default App;
