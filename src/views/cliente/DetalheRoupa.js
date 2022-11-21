import { faCartPlus, faShoppingCart, faTimesCircle, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Row, Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import LAlerta from '../../componentes/alerta/LAlerta';
import FormLayout from "../../layout/FormLayout";
import { apiGet, apiPost, apiPut } from '../../util/apiutil';

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarrinho: { id: "", quantidade: "", tamanho: "",  roupaId: "", carrinhoCompraId: "", clienteId: "" },
      pedido:{frete: "", valorTotalVenda: "", status: "", clienteId: "" },
      roupas: [],
      itensCarrinho: [],
    };
  }

  async componentDidMount() { 
    const roupaId = this.props.match.params.roupaId;
    await this.consultaRoupa(roupaId);
    await this.consultaItemCarrinho(roupaId)
  }

  async consultaRoupa(roupaId) {
    try {
      let roupas = await apiGet("/Roupa" + "/" + roupaId);

      this.setState({
        roupas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async consultaItemCarrinho(roupaId) {
    try {
      let itensCarrinho = await apiGet("/ItemCarrinho" , roupaId);
      console.log(itensCarrinho);

      this.setState({
        itensCarrinho,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleAdicionarCarrinho(roupa){
    try {   
      var clienteId = localStorage.getItem('clienteId');
      this.state.pedido.clienteId = clienteId;
      await apiPost("/Pedido", this.state.pedido)
       window.location.href = ("/CarrinhoCliente");
    } catch (error) {
      console.log(error);
    }
  }

  async handleTamanhoItem(itemCarrinho){
    try {
      console.log(itemCarrinho)
      var clienteId = localStorage.getItem('clienteId');
         await apiPut("/ItemCarrinho" + "/"  +  itemCarrinho + "/" + clienteId );
    } catch (error) {
      console.log(error);
    }
  }

  async handleQuantidadeItem(itemCarrinho){
    try {
      var clienteId = localStorage.getItem('clienteId');
      await apiPut("/ItemCarrinho" + "/"  +  itemCarrinho + "/" + clienteId );
      
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const catalog = this.state.roupas.map((roupa, roupaId) => (
    <FormLayout>
      <Card.Title style={{
                color: "#755721",
                margin: '5'
  
              }} >
               Detalhe da compra 
              </Card.Title>
          <Col md={10}>
          <div className="mx-3 mb-4">
        <CardGroup>
          <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
            <Card.Img
              variant="top"
              src={`${roupa.imgLink}`}
              style={{ width: "100%", height: "275px" }}
            />
          </Card>
          <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
          <Card.Title style={{
                margin: '1em'
  
              }}>{`${roupa.nome}`}</Card.Title>
              <Card.Text style={{
                color: "#755721",
                margin: '1em'
  
              }}>
                <strong>R${roupa.preco}</strong>
                <p>{roupa.descricao}</p>
              </Card.Text>
            <Card.Title style={{
                color: "#755721",
                margin: '1em'
  
              }} >
                Escolha seu tamanho
              </Card.Title>
              <ButtonGroup style={{
                margin: '1em'
              }}>{this.state.itensCarrinho.map((itemCarrinho, i) => (
                <>
                 <Button  onClick={() =>
                   {this.handleTamanhoItem(itemCarrinho.tamanho = "PP")}}>PP</Button>
                     <Button  onClick={() =>
                   {this.handleTamanhoItem(itemCarrinho.tamanho = "P")}}>P</Button>
                     <Button  onClick={() =>
                   {this.handleTamanhoItem(itemCarrinho.tamanho = "M")}}>M</Button>
                     <Button onClick={() =>
                   {this.handleTamanhoItem(itemCarrinho.tamanho = "G")}}>G</Button>
                     <Button  onClick={() =>
                   {this.handleTamanhoItem(itemCarrinho.tamanho = "GG")}}>GG</Button>
                </>
              ))}
              </ButtonGroup>
              <Card.Title style={{
                color: "#755721",
                margin: '1em'
  
              }} >
                Quantidade
              </Card.Title>
              <DropdownButton style={{
                color: "#755721",
                margin: '1em'
  
              }} id="dropdown-basic-button" title="Quantidade">
              {this.state.itensCarrinho.map((itemCarrinho, i) => (
                <>
              <Dropdown.Item href="#/action-1" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 1)} }>1</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 2)} }>2</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 3)} }>3</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 4)} }>4</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 5)} }>5</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 6)} }>6</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 7)} }>7</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 8)} }>8</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 9)} }>9</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={() =>  
               {this.handleQuantidadeItem(itemCarrinho.quantidade = 10)} }>10</Dropdown.Item>
                </>))}
            </DropdownButton>
                <Button style={{
                color: "#755721",
                margin: '1em'
  
              }}
                  variant="dark"
                  block
                  onClick={() => {
                    this.handleAdicionarCarrinho(roupa);
                  }}
                >
                  <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                  Adicionar item no carrinho
                </Button>
          </Card>
          </CardGroup>
          </div>
          </Col>
    </FormLayout> ));
   return (
    <>
      <LAlerta
          showAlert={this.state.alert}
          messages={this.state.alert}
          variant={this.state.alert}
          title={this.state.alert}
      />
      <Row>{catalog}</Row>
    </>
   );
  
  };
  }


