import { Component } from 'react';
import { Row, Button, ButtonGroup, Card, CardGroup, Col, DropdownButton, Form, FormGroup } from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { apiGet } from '../../util/apiutil';
import LAlerta from '../../componentes/alerta/LAlerta';
import LInput from '../../componentes/form/LInput';
import LSelect from '../../componentes/form/LSelect';

export default class CarrinhoCliente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // itemCarrinho: { id: "", quantidade: "", roupaId: "", carrinhoCompraId: "", clienteId: "" },
      // enderecoEntrega:{ tipoResidencia : "", tipoLogradouro: "", logradouro: "", numero: "",  bairro: "", cep: "", clienteId: "", cidadeId: ""},
      carrinhoCompras: [],
      roupas: [],
      itensCarrinho: [],
      enderecosEntrega:[],
      cartoesCredito:[]

    }
  };

  async componentDidMount() {
    console.log("teste");
    await this.consultaCarrinhoCompra();
    await this.consultaClienteEndereco();
    await this.consultaClienteCartão();
    
  }

  async consultaClienteEndereco(){
    try {
      var clienteId = localStorage.getItem('clienteId');
      let enderecoEntrega = await apiGet("/EnderecoEntrega" + "/" + clienteId)
      console.log(enderecoEntrega);

      this.setState({ 
       enderecosEntrega : enderecoEntrega
       
      });
    } catch (error) {
      console.log(error);
    } 
    
  }

  async consultaClienteCartão(){
    try {
      var clienteId = localStorage.getItem('clienteId');
      let cartaoCredito = await apiGet("/CartaoCredito" + "/" + clienteId)
      console.log(cartaoCredito);

      this.setState({ 
        cartoesCredito : cartaoCredito 
       
      });
    } catch (error) {
      console.log(error);
    } 
    
  }

  async consultaCarrinhoCompra() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      let cliente = await apiGet("/Cliente" + "/" + clienteId);
      // console.log(cliente);

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
       <Card.Title>Meu carrinho</Card.Title>
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
            <Card.Title>Endereço de entrega cadastrado: </Card.Title>
            {this.state.enderecosEntrega.map((enderecoEntrega, i) => (
                       <Card.Text>
                       <p>Tipo Residência: {enderecoEntrega.tipoResidencia}</p>
                       <p>Tipo Logradouro: {enderecoEntrega.tipoLogradouro}</p>
                       <p>Logradouro: {enderecoEntrega.logradouro}</p>
                       <p>Número: {enderecoEntrega.numero}</p>
                       <p>Bairro: {enderecoEntrega.bairro}</p>
                       <p>Cep: {enderecoEntrega.cep}</p>
                     </Card.Text>
            ))}
              <Form.Check type="checkbox" label="Utilizar endereço cadastrado" />
              <p></p>
            <Button style={{
               color: "#755721"
             }}>Adicionar novo endereço de entrega</Button>
             <p></p>
             <Card.Title>Forma de pagamento cadastrado: </Card.Title>
            {this.state.cartoesCredito.map((cartaoCredito, i) => (
                       <Card.Text>
                       <p>Numero cartão: {cartaoCredito.numeroCartao}</p>
                       <p>Nome cartão: {cartaoCredito.nomeCartao}</p>
                       <p>Codigo de segurança: {cartaoCredito.codigoSeguranca}</p>
                     </Card.Text>
            ))}
               <Form.Check type="checkbox" label="Utilizar forma de pagamento cadastrada" />
               <p></p>
              <Button style={{
               color: "#755721"
             }}>Adicionar nova forma de pagamento</Button>
             <p></p>
          </Card>
     </CardGroup>
     <Button  style={{
               color: "#755721", margin: "2em", marginRight: "10em", marginLeft: "30em"
             }}>Finalizar compra</Button>
     </div>
     </Col>
))} </FormLayout>

    );

  };
}
