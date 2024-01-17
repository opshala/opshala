/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";
import App from "./App";
import Home from "./components/apps/Home";
import Setup from "./components/settings/Setup";

render(
  () => (
    <Router root={App}>
      <Route path="/apps" component={Home}>
        <Route path="/" />
        <Route path="/:id" />
      </Route>
      <Route path="/settings/general" component={Setup} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
