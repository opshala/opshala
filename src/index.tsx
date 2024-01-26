/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Setup from "./components/settings/Setup";
import AppsIndex from "./components/apps/AppsIndex";
import AppsList from "./components/apps/List";
import SettingsIndex from "./components/settings/SettingsIndex";

render(
  () => (
    <Router root={App}>
      <Route path="/apps" component={AppsIndex}>
        <Route path="/" component={AppsList} />
        <Route path="/install/:id" />
        <Route path="/:id" />
      </Route>

      <Route path="/settings" component={SettingsIndex}>
        <Route path="/" component={Setup} />
      </Route>

      <Route path="/" component={Home} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
