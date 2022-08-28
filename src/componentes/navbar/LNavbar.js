import React, { Component } from "react";
import { Nav, NavDropdown, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../App.css";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";

export default class LNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg"  bg="primary">
  <Container>
    <Navbar.Brand style={{ color:"#755721"}} href="/">Loja Mariana</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {/* <Nav.Link  style={{ color:"#755721"}} href="#home">Minhas compras</Nav.Link> */}
        {/* <Nav.Link  style={{ color:"#755721"}} href="/FormaPagamento">Forma de Pagamento</Nav.Link>
        <Nav.Link  style={{ color:"#755721"}} href="/Endereco">Endereço</Nav.Link> */}
        <Nav.Link  style={{ color:"#755721"}} href="/DadosCliente">Dados Pessoais</Nav.Link>
        {/* <Nav.Link  style={{ color:"#755721"}} href="/CadastroRoupa">Cadastro Roupa</Nav.Link> */}
        <Nav.Link  style={{ color:"#755721"}} href="/CarrinhoCliente">Meu Carrinho</Nav.Link>
        <Nav.Link  style={{ color:"#755721"}} href="/MinhasCompras">Meus Pedidos</Nav.Link>
        {/* <NavDropdown   title="Meus Dados" id="basic-nav-dropdown">
          <NavDropdown.Item  href="#action/3.1">Forma de Pagamento</NavDropdown.Item>
          <NavDropdown.Item  href="#action/3.2">Endereço</NavDropdown.Item>
          <NavDropdown.Item   href="#action/3.3">Dados Pessoais</NavDropdown.Item> */}
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
        {/* </NavDropdown> */}
      </Nav>
      <Nav >
         <Nav.Link  style={{ color:"#755721"}} href="/CadastroClienteTeste">Cadastrar-se</Nav.Link>
         {/* <Nav.Link  style={{ color:"#755721"}} href="/ConsultaCliente">Consultar Cliente</Nav.Link> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    );
  }
}