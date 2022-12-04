import React, { Component } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import DadosCliente from "./views/cliente/DadosCliente";
import HomeCadastroSucesso from "./views/cliente/HomeCadastroSucesso";
import HomeAlteradoSucesso from "./views/cliente/HomeAlteradoSucesso";
import FormaPagamento from "./views/cliente/FormaPagamento";
import HomeAtualizadoSucesso from "./views/cliente/HomeAtualizadoSucesso";
import HomeExcluidoSucesso from "./views/cliente/HomeExcluidoSucesso";
import ConsultaCliente from "./views/cliente/ConsultaCliente";
import CadastroClienteTeste from "./views/cliente/CadastroClienteTeste";
import DetalheRoupa from "./views/cliente/DetalheRoupa";
import LoginCliente from "./views/cliente/LoginCliente";
import MeuCarrinho from "./views/cliente/MeuCarrinho";
import CarrinhoCliente from "./views/cliente/CarrinhoCliente";
import FinalizandoCompra from "./views/cliente/FinalizandoCompra";
import HomeFinalizaCompra from "./views/cliente/HomeFinalizaCompra";
import Teste from "./views/cliente/Teste";
import ConsultaClienteAdmin from "./views/administrador/ConsultaClienteAdmin";
import LCatalogo from "./componentes/catalogo/LCatalogo";
import EnderecoEntrega from "./views/cliente/EnderecoEntrega";
import PedidoCliente from "./views/cliente/PedidoCliente";
import GerenciamentoCompra from "./views/administrador/GerenciamentoCompra";


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
            path="/DadosCliente"
            exact
            component={DadosCliente}
          />
         <this.PublicRoute
            path="/EnderecoEntrega"
            exact
            component={EnderecoEntrega}
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
            path="/HomeFinalizaCompra"
            exact
            component={HomeFinalizaCompra}
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
            path="/DetalheRoupa/:roupaId"
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
            <this.PublicRoute
            path="/FinalizandoCompra"
            exact
            component={FinalizandoCompra}
          />
           <this.PublicRoute
            path="/Teste"
            exact
            component={Teste}
          />
           <this.PublicRoute
            path="/ConsultaClienteAdmin"
            exact
            component={ConsultaClienteAdmin}
          />
             <this.PublicRoute
            path="/PedidoCliente"
            exact
            component={PedidoCliente}
          />
            <this.PublicRoute
            path="/GerenciamentoCompra"
            exact
            component={GerenciamentoCompra}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
