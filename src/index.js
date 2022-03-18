import React from "react";
import ReactDOM from "react-dom";
import { observer, Provider } from "mobx-react";
import "./index.css";

import todoStore from "./store/todoStore";
import Todos from "./components/Todos";

const App = observer(() => (
  <Provider todoStore={todoStore}>
    <Todos />
  </Provider>
));

ReactDOM.render(<App />, document.getElementById("root"));
