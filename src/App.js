
import { Route, Switch } from "react-router-dom";
import ipConfig from "./ipConfig.json";
import Landing from "./components/Landing";
import Cart from "./components/Cart";
// export const config = {
//   endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
// };
function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
        <Route path='/' component={Landing} exact/>
        <Route path='/cart' component={Cart} />
      </Switch>
    </div>
  );
}

export default App;