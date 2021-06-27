import './App.css';
import 'antd/dist/antd.css';
import { Route , BrowserRouter as Router, Switch } from 'react-router-dom'
import {AddTodo} from "./components/addTodo";
import {CompletedTodos} from "./components/completedTodos";
import {NotCompletedTodos} from "./components/notCompletedTodos";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
              <Switch>
                  <Route exact path='/' component={AddTodo}></Route>
                  <Route exact path='/completed' component={CompletedTodos}></Route>
                  <Route exact path='/pending' component={NotCompletedTodos}></Route>
              </Switch>
          </Router>
      </header>
    </div>
  );
}
export default App;
