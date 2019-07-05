import React from 'react';
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPostContainer from "./BlogPostContainer";
import Header from "./Header";


class App extends React.Component {


  render() {


    return (
      <div>
          <Header/>
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/" component={BlogPostContainer}/>
        </Switch>
      </div>
    )
  }
}

export default App;
