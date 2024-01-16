import { Component } from "solid-js";

import { UserProvider } from "./stores/user";
import NavigationBar from "./widgets/navigation/NavigationBar";
import Screens from "./components/Screens";
import { ProjectsProvider } from "./stores/projects";

const App: Component = () => {
  return (
    <UserProvider>
      <ProjectsProvider>
        <>
          <NavigationBar />

          <div class="pt-16">
            <Screens />
          </div>
        </>
      </ProjectsProvider>
    </UserProvider>
  );
};

export default App;
