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
import { apiGet } from "../../util/apiutil";

export default class PedidoCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: { id: "", frete: "", valorTotalVenda: "", status: "", clienteId: "", itemCarrinhoId: "" },
      pedidos: []
    }
  }

  async componentDidMount() {
    await this.consultaPedidoCliente();

  }

  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  async consultaPedidoCliente() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      var retorno = await apiGet("/Pedido" + "/" + clienteId)
      console.log(retorno);

      this.setState({ 
        pedidos : retorno
        
       });

    } catch (error) {

    }
  }


  render() {
    return (
      <FormLayout>
        {this.state.pedidos.map((pedido, roupaId) => (
           <Col md={12}>
           <div className="mx- mb-4">
           <Card.Title style={{
                    color: "#755721",
                    margin: "1em"
      
                  }} >
                  Meus pedidos 
                  </Card.Title>
          <Card.Title style={{
                    margin: "1em"
                  }}>Status do pedido: {pedido.status}</Card.Title>
         <CardGroup>
         <Card.Title style={{
                    margin: "1em"
                  }}>Item do seu pedido: </Card.Title>
           <Card style={{ margin: "2em", marginRight: "5em", marginLeft: "5em" }}>
             <Card.Img
               variant="top"
               src={`${pedido.itemCarrinho.roupa.imgLink}`}
               style={{ width: "100%", height: "275px" }}
             />
               <Card.Title>{`${pedido.itemCarrinho.roupa.nome}`}</Card.Title>
               <Card.Text>
                 <strong>R${pedido.itemCarrinho.roupa.preco}</strong>
                 <p>{pedido.itemCarrinho.roupa.descricao}</p>
               </Card.Text>
            </Card>
              <Card style={{ margin: "2em", marginRight: "5em", marginLeft: "5em" }}>
              <Card.Title style={{
                 color: "#755721",
                 margin: '1em'
    
               }} >
                 Tamanho: 
               </Card.Title>
               <ButtonGroup style={{
                 margin: '1em'
               }}>
                 <Button style={{
                   color: "#755721"
                 }}>{pedido.itemCarrinho.tamanho}</Button>
               </ButtonGroup>
               <Card.Title style={{
                 color: "#755721",
    
               }} >
                 Quantidade: 
                 {pedido.itemCarrinho.quantidade}</Card.Title>                   
              </Card>      
           </CardGroup>
           </div>
     </Col>
     ))} </FormLayout>

    );

  };
}
