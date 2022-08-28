import React, { Component } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import CadastroCliente from "./views/CadastroCliente";
import AlteraCliente from "./views/AlteraCliente";
import DadosCliente from "./views/DadosCliente";
import Endereco from "./views/Endereco";
import HomeCadastroSucesso from "./views/HomeCadastroSucesso";
import HomeAlteradoSucesso from "./views/HomeAlteradoSucesso";
import FormaPagamento from "./views/FormaPagamento";
import HomeAtualizadoSucesso from "./views/HomeAtualizadoSucesso";
import HomeExcluidoSucesso from "./views/HomeExcluidoSucesso";
import ConsultaCliente from "./views/ConsultaCliente";
import CadastroClienteTeste from "./views/CadastroClienteTeste";
import DetalheRoupa from "./views/DetalheRoupa";
import LoginCliente from "./views/LoginCliente";
import MeuCarrinho from "./views/MeuCarrinho";
import CarrinhoCliente from "./views/CarrinhoCliente";


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
            exact
            component={Layout}
          />
          <this.PublicRoute
            path="/CadastroCliente"
            exact
            component={CadastroCliente}
          />
          <this.PublicRoute
            path="/AlteraCliente"
            exact
            component={AlteraCliente}
          />
          <this.PublicRoute
            path="/DadosCliente"
            exact
            component={DadosCliente}
          />
         <this.PublicRoute
            path="/Endereco"
            exact
            component={Endereco}
          />
             <this.PublicRoute
            path="/HomeCadastroSucesso"
            exact
            component={HomeCadastroSucesso}
          />
          <this.PublicRoute
            path="/HomeAlteradoSucesso"
            exact
            component={HomeAlteradoSucesso}
          />
            <this.PublicRoute
            path="/FormaPagamento"
            exact
            component={FormaPagamento}
          />
          <this.PublicRoute
            path="/HomeAtualizadoSucesso"
            exact
            component={HomeAtualizadoSucesso}
          />
          <this.PublicRoute
            path="/HomeExcluidoSucesso"
            exact
            component={HomeExcluidoSucesso}
          />
          <this.PublicRoute
            path="/ConsultaCliente"
            exact
            component={ConsultaCliente}
          />
           <this.PublicRoute
            path="/CadastroClienteTeste"
            exact
            component={CadastroClienteTeste}
          />
          <this.PublicRoute
            path="/DetalheRoupa"
            exact
            component={DetalheRoupa}
          />
          <this.PublicRoute
            path="/LoginCliente"
            exact
            component={LoginCliente}
          />
              <this.PublicRoute
            path="/MeuCarrinho"
            exact
            component={MeuCarrinho}
          />
            <this.PublicRoute
            path="/CarrinhoCliente"
            exact
            component={CarrinhoCliente}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
