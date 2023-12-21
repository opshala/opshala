import { Component } from "solid-js";
import { UserProvider } from "./stores/user";
import NavigationBar from "./widgets/NavigationBar";

const App: Component = () => {
  return (
    <div>
      <UserProvider>
        <>
          <NavigationBar />
        </>
      </UserProvider>
    </div>
  );
};

export default App;
