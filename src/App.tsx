import { Component } from "solid-js";

import { UserProvider } from "./stores/user";
import NavigationBar from "./widgets/NavigationBar";
import Screens from "./components/Screens";

const App: Component = () => {
  return (
    <div>
      <UserProvider>
        <>
          <NavigationBar />

          <div class="pt-16">
            <Screens />
          </div>
        </>
      </UserProvider>
    </div>
  );
};

export default App;
