import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './components/Home';
import { EditMessagePage } from './components/EditMessage';
import { AddMessagePage } from './components/AddMessage';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/add" component={AddMessagePage} exact />
          <Route path="/edit/:id" component={EditMessagePage} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
