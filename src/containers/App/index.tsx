import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Home from '../Home';
import User from '../User';
import Users from '../Users';
import './index.scss';

const App = () => (
  <Router>
    <div className="body">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:username">
          <User />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
