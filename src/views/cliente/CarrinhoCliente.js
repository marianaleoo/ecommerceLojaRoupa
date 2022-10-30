import { Component } from 'react';
import { Row, Button, ButtonGroup, Card, CardGroup, Col, DropdownButton, Form, FormGroup } from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { apiGet } from '../../util/apiutil';
import LAlerta from '../../componentes/alerta/LAlerta';

export default class CarrinhoCliente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarrinho: { id: "", quantidade: "", roupaId: "", carrinhoCompraId: "", clienteId: "" },
      carrinhoCompras: [],
      roupas: [],
      itensCarrinho: []
    }
  };

  async componentDidMount() {
    console.log("teste");
    await this.consultaCarrinhoCompra();
  }

  async consultaCarrinhoCompra() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      let cliente = await apiGet("/Cliente" + "/" + clienteId);
      console.log(cliente);

      this.setState({
        itensCarrinho: cliente[0].carrinho.itensCarrinho
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <FormLayout>
      {this.state.itensCarrinho.map((itemCarrinho, roupaId) => (
      <Col md={12}>
       <div className="mx- mb-4">
     <CardGroup>
       <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
         <Card.Img
           variant="top"
           src={`${itemCarrinho.roupa.imgLink}`}
           style={{ width: "100%", height: "275px" }}
         />
         <Card.Body>
           <Card.Title>{`${itemCarrinho.roupa.nome}`}</Card.Title>
           <Card.Text>
             <strong>R${itemCarrinho.roupa.preco}</strong>
             <p>{itemCarrinho.roupa.descricao}</p>
           </Card.Text>
           <Card.Title style={{
             color: "#755721",
             margin: '1em'

           }} >
             Tamanho
           </Card.Title>
           <ButtonGroup style={{
             margin: '1em'
           }}>
             <Button style={{
               color: "#755721"
             }}>{itemCarrinho.roupa.tamanho}</Button>
           </ButtonGroup>
           <Card.Title style={{
             color: "#755721",

           }} >
             Quantidade
             {itemCarrinho.quantidade}</Card.Title>
         </Card.Body>
       </Card>
       <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
            <Card.Title>Endereço de entrega</Card.Title>
          </Card>
     </CardGroup>
     </div>
     </Col>
))} </FormLayout>

    );

  };

  // render() {
  //   return (
  //     <FormLayout>
  //       <Card.Title style={{
  //         color: "#755721"
  //       }}>
  //         <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />

  //         Carrinho de Compra</Card.Title>
  //       <CardGroup>
  //         <Card
  //         >
  //           <Card.Img src="https://images.tcdn.com.br/img/img_prod/889236/shorts_saia_bella_2_0_xadrez_145_3_87a438241de0ce24a3af78d321233dfc.jpg"
  //             style={{
  //               width: '18rem',
  //               height: '10rem',
  //               margin: '1em'
  //             }} />

  //         </Card>
  //         <Card>
  //           <Card.Title style={{
  //             color: "#755721"
  //           }}>
  //             Shorts Saia
  //           </Card.Title>
  //           <Card.Title style={{
  //             color: "#755721"
  //           }}>
  //             R$59,90
  //           </Card.Title>
  //           <Card.Title style={{
  //             color: "#755721"
  //           }} >
  //             Tamanho:
  //           </Card.Title>
  //           <ButtonGroup>
  //             <Button style={{
  //               color: "#755721"

  //             }}>P</Button>
  //           </ButtonGroup>
  //           <br></br>
  //           <Card.Title style={{
  //             color: "#755721"
  //           }}>Quantidade: 1</Card.Title>
  //           {/* <Dropdown>
  //      <DropdownButton id="dropdown-basic-button" title="Quantidade">
  //       <Dropdown.Item href="#/action-1">1</Dropdown.Item>
  //       <Dropdown.Item href="#/action-2">2</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">3</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">4</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">5</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">6</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">7</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">8</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">9</Dropdown.Item>
  //       <Dropdown.Item href="#/action-3">10</Dropdown.Item>
  //       </DropdownButton>
  //   </Dropdown> */}
  //           <Button href="\FinalizandoCompra" style={{
  //             color: "#755721"

  //           }} >
  //             Continuar
  //           </Button>
  //         </Card>
  //       </CardGroup>
  //     </FormLayout>
  //   )
  // }
}
