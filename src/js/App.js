import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import City from '../components/City';
import Week from '../components/Week';
import store from '../../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
                <Router>
          <React.Fragment>
          <Switch>
          <Route exact path="/" component={City}/>
          <Route exact path="/index.html" component={City}/>
          <Route exact path="/index.html/week/:city" component={Week}/>
          </Switch>
          </React.Fragment>
          </Router>
      </Provider>
    );
  }
}

export default App;