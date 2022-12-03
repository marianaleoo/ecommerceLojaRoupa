import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  CardGroup,
  ButtonGroup,
} from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import Layout from "../../layout/Layout";
import { apiGet, apiPost } from "../../util/apiutil";

export default class PedidoCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compra: { clienteId: "" },
      itemCompra: { status: "", compraId: "", roupaId: "", preco: "" },
      itensCompra: [],
      compras: []
    }
  }

  async componentDidMount() {
    console.log("teste");
    await this.consultaitemCompraCliente();

  }

  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  async consultaitemCompraCliente() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      var compra = await apiGet("/Compra" + "/" + clienteId)
      console.log(compra);
      var itensCompra = compra.map((c) => {
        return c.itensCompra
      }).flat(1);

      console.log(itensCompra);
      this.setState({
        itensCompra: itensCompra

      });
      this.setState({
        compras: compra

      });
    } catch (error) {
    }
  }

  async trocarItemCompra(itemCompra) {
    try {

      await apiPost("Compra/Troca", itemCompra);
      await this.consultaitemCompraCliente();

    } catch (error) {

    }
  }


  render() {
    return (
      <FormLayout>
        {this.state.compras.map((compra, id) => (
          <Col md={12}>
            <div className="mx- mb-4">
              <Card.Title style={{
                color: "#755721",
                margin: "1em"

              }} >
                Compra {compra.id}
              </Card.Title>
              <Card.Title style={{
                margin: "1em"
              }}>Status da compra: {compra.status}</Card.Title>
              <Card.Title style={{
                margin: "1em"
              }}>Itens da compra: </Card.Title>
              {this.state.itensCompra.map((itemCompra, id) => (
                <Col md={6}>
                  <div className="mx- mb-4">
                    <CardGroup>

                      <Card style={{ margin: "2em", marginRight: "5em", marginLeft: "5em" }}>
                        <Card.Img
                          variant="top"
                          src={`${itemCompra.roupa.imgLink}`}
                          style={{ width: "100%", height: "180px" }}
                        />
                        <Card.Title>{`${itemCompra.roupa.nome}`}</Card.Title>
                        <Card.Text>
                          <strong>R${itemCompra.preco}</strong>
                          <p>{itemCompra.roupa.descricao}</p>
                          <p>Status do seu item: {itemCompra.status}</p>
                        </Card.Text>
                        <ButtonGroup>
                          <Button  onClick={() => {
                            this.trocarItemCompra(itemCompra);
                          }}>Trocar</Button>
                        </ButtonGroup>

                      </Card>

                    </CardGroup>
                  </div>
                </Col>
              ))}</div></Col>
        ))} </FormLayout>
    );
  };
}
