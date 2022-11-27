import { Component } from 'react';
import { Row, Button, ButtonGroup, Card, CardGroup, Col, DropdownButton, Form, FormGroup } from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShoppingCart, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { apiGet, apiPost, apiPut } from '../../util/apiutil';
import LAlerta from '../../componentes/alerta/LAlerta';
import LInput from '../../componentes/form/LInput';
import LSelect from '../../componentes/form/LSelect';

export default class CarrinhoCliente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      compra: { pedidoId: 4, status: "EM PROCESSAMENTO", cartaoCreditoId: 12, cupomPromocionalId: null, enderecoEntregaId: 1},
      pedido:{id: 4, frete: "", valorTotalVenda: "", status: "", clienteId: "", itemCarrinhoId: "" },
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
  
  async finalizarCompra(itemCarrinho){
    try{    
        await apiPost("/Compra", this.state.compra)
        this.state.pedido.status = "EM ANÁLISE"
        var clienteId = localStorage.getItem('clienteId');
        this.state.pedido.clienteId = clienteId;
        this.state.pedido.itemCarrinhoId = itemCarrinho.id;
        await apiPut("Pedido/" + this.state.pedido.id,  this.state.pedido)
        window.location.href = ("/HomeFinalizaCompra");
         
    }catch (error) {
      console.log(error);
    }
  }

  async salvarEnderecoCompra(enderecoEntrega) {
    try {

      await apiPost("/Compra");
      
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
       <Card.Title style={{
                color: "#755721",
                margin: '5'
  
              }} >
              Meu carrinho
              </Card.Title>
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
             Tamanho: 
           </Card.Title>
           <ButtonGroup style={{
             margin: '1em'
           }}>
             <Button style={{
               color: "#755721"
             }}>{itemCarrinho.tamanho}</Button>
           </ButtonGroup>
           <Card.Title style={{
             color: "#755721",

           }} >
             Quantidade: 
             {itemCarrinho.quantidade}</Card.Title>
         </Card.Body>
       </Card>
       <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
            <Card.Title style={{
                color: "#755721"  
              }}>Endereço de entrega cadastrado: </Card.Title>
            {this.state.enderecosEntrega.map((enderecoEntrega, i) => (
                       <Card.Text>
                       <p>Tipo Residência: {enderecoEntrega.tipoResidencia}</p>
                       <p>Tipo Logradouro: {enderecoEntrega.tipoLogradouro}</p>
                       <p>Logradouro: {enderecoEntrega.logradouro}</p>
                       <p>Número: {enderecoEntrega.numero}</p>
                       <p>Bairro: {enderecoEntrega.bairro}</p>
                       <p>Cep: {enderecoEntrega.cep}</p>
                       <Form.Check style={{
                color: "#755721"  
              }} onClick={() => {
                this.salvarEnderecoCompra(enderecoEntrega);
              }} type="checkbox" value="enderecoEntrega" label="Utilizar endereço cadastrado" />
                     </Card.Text>
            ))}
              <p></p>
            <Button href="/EnderecoEntrega" style={{
               color: "#755721"
             }}>Adicionar novo endereço de entrega</Button>
             <p></p>
             <Card.Title style={{
                color: "#755721"  
              }}>Forma de pagamento cadastrado: </Card.Title>
            {this.state.cartoesCredito.map((cartaoCredito, i) => (
                       <Card.Text>
                       <p>Numero cartão: {cartaoCredito.numeroCartao}</p>
                       <p>Nome cartão: {cartaoCredito.nomeCartao}</p>
                       <p>Validade do Cartão: {cartaoCredito.validadeCartao}</p>
                       <Form.Check style={{
                            color: "#755721"  
                          }} type="checkbox" label="Utilizar forma de pagamento cadastrada" />
                     </Card.Text>                
            ))}          
               <p></p>
              <Button href="/FormaPagamento" style={{
               color: "#755721"
             }}>Adicionar nova forma de pagamento</Button>
             <p></p>
          </Card>
     </CardGroup>
     <Button  style={{
               color: "#755721", margin: "2em", marginRight: "10em", marginLeft: "30em"
             }}   onClick={() => {
              this.finalizarCompra(itemCarrinho);
            }}>Finalizar compra</Button>
     </div>
     </Col>
))} </FormLayout>

    );

  };
}
