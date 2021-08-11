import React, { Component } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import CadastroCliente from "./views/CadastroCliente";
import AlteraCliente from "./views/AlteraCliente";
import ConsultaCliente from "./views/ConsultaCliente";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  PrivateRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed === true ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }
  PublicRoute({ component: Component, authed, ...rest }) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  NotFoundRoute({ component: Component, authed, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authed === true ? (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    );
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <this.PublicRoute
            path="/"
            authed={this.state.isLoggedIn}
            exact
            component={Layout}
          />
          <this.PublicRoute
            path="/CadastroCliente"
            authed={this.state.isLoggedIn}
            exact
            component={CadastroCliente}
          />
          <this.PublicRoute
            path="/AlteraCliente"
            authed={this.state.isLoggedIn}
            exact
            component={AlteraCliente}
          />
          <this.PublicRoute
            path="/ConsultaCliente"
            authed={this.state.isLoggedIn}
            exact
            component={ConsultaCliente}
          />
          {/* <this.PublicRoute
            path="/login"
            //authed={this.state.isLoggedIn}
            exact
            component={login}
          />
          <this.PublicRoute
            path="/signUp"
            //authed={this.state.isLoggedIn}
            exact
            component={signUp}
          />
          <this.PublicRoute
            path="/cart"
            //authed={this.state.isLoggedIn}
            exact
            component={cart}
          />
          <this.PublicRoute
            path="/artist"
            //authed={this.state.isLoggedIn}
            exact
            component={artist}
          />
          <this.PublicRoute
            path="/genres"
            //authed={this.state.isLoggedIn}
            exact
            component={genre}
          />
          <this.PublicRoute
            path="/disc"
            //authed={this.state.isLoggedIn}
            exact
            component={disc}
          />

          <this.NotFoundRoute //authed={this.state.isLoggedIn}
            component={home}
          /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
