import { VisibilityProvider } from "./providers/Visibility";
import ExampleMenu from "./components/ExampleMenu";
import "./style/global.css";

function App() {
  return (
    <VisibilityProvider>
      <ExampleMenu />
    </VisibilityProvider>
  );
}

export default App;

