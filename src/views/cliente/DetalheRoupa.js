import { faCartPlus, faShoppingCart, faTimesCircle, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Row, Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import LAlerta from '../../componentes/alerta/LAlerta';
import FormLayout from "../../layout/FormLayout";
import { apiGet, apiPost } from '../../util/apiutil';

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarrinho: { id: "", quantidade: "", tamanho: "",  roupaId: "", carrinhoCompraId: "", clienteId: "" },
      roupas: [],
    };
  }

  async componentDidMount() { 
    const roupaId = this.props.match.params.roupaId;
    await this.consultaItemCarrinho(roupaId);
  }

  async consultaItemCarrinho(roupaId) {
    try {
      let roupas = await apiGet("/Roupa" + "/" + roupaId);

      this.setState({
        roupas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleAdicionarCarrinho(roupa){
    try {
      var clienteId = localStorage.getItem('clienteId');
       var response =  await apiPost("/ItemCarrinho/", {roupaId : roupa.id, clienteId: clienteId } );
       console.log(response);    
       window.location.href = ("/CarrinhoCliente");
    } catch (error) {
      console.log(error);
    }
  }

  // async handleQuantidadeItem(itemCarrinho){
     
  // }

  // async handleTamanhoItem(itemCarrinho){

  // }

  render() {
    const catalog = this.state.roupas.map((roupa, roupaId) => (
    <FormLayout>
          <Col md={6}>
          <div className="mx-3 mb-4">
        <CardGroup>
          <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
            <Card.Img
              variant="top"
              src={`${roupa.imgLink}`}
              style={{ width: "100%", height: "275px" }}
            />
            <Card.Body>
              <Card.Title>{`${roupa.nome}`}</Card.Title>
              <Card.Text>
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
              }}>
                 <Button value onClick={() => {
                    this.handleTamanhoItem(roupa);
                  }} style={{
                  color: "#755721"
  
                }}>PP</Button>
                  <Button  onClick={() => {
                    this.handleTamanhoItem(roupa);
                  }} style={{
                  color: "#755721"
  
                }}>P</Button>
                   <Button  onClick={() => {
                    this.handleTamanhoItem(roupa);
                  }} style={{
                  color: "#755721"
  
                }}>M</Button>
                   <Button  onClick={() => {
                    this.handleTamanhoItem(roupa);
                  }} style={{
                  color: "#755721"
  
                }}>G</Button>
                   <Button  onClick={() => {
                    this.handleTamanhoItem(roupa);
                  }} style={{
                  color: "#755721"
                }}>GG</Button>
              </ButtonGroup>
              <Card.Title style={{
                color: "#755721",
  
              }} >
                Quantidade
              </Card.Title>
              <DropdownButton id="dropdown-basic-button" title="Quantidade">
              <Dropdown.Item href="#/action-1">1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3</Dropdown.Item>
              <Dropdown.Item href="#/action-3">4</Dropdown.Item>
              <Dropdown.Item href="#/action-3">5</Dropdown.Item>
              <Dropdown.Item href="#/action-3">6</Dropdown.Item>
              <Dropdown.Item href="#/action-3">7</Dropdown.Item>
              <Dropdown.Item href="#/action-3">8</Dropdown.Item>
              <Dropdown.Item href="#/action-3">9</Dropdown.Item>
              <Dropdown.Item href="#/action-3">10</Dropdown.Item>
            </DropdownButton>
                <Button
                  variant="dark"
                  block
                  onClick={() => {
                    this.handleAdicionarCarrinho(roupa);
                  }}
                >
                  <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                  Adicionar item no carrinho
                </Button>
            </Card.Body>
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


