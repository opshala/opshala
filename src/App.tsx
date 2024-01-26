import { Component } from "solid-js";

import { UserProvider } from "./stores/user";
import { ProjectsProvider } from "./stores/project";
import NavigationBar from "./widgets/navigation/NavigationBar";
import { RouteSectionProps } from "@solidjs/router";

const App: Component<RouteSectionProps> = (props) => {
  return (
    <UserProvider>
      <ProjectsProvider>
        <NavigationBar />

        <div class="pt-16">{props.children}</div>
      </ProjectsProvider>
    </UserProvider>
  );
};

export default App;
