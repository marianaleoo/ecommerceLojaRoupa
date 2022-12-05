import { faCartPlus, faShoppingCart, faTimesCircle, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Row, Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, Col } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import LAlerta from '../../componentes/alerta/LAlerta';
import LSelect from '../../componentes/form/LSelect';
import FormLayout from "../../layout/FormLayout";
import { apiGet, apiPost, apiPut } from '../../util/apiutil';
import { updateStateValue } from '../../util/util';

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarrinho: { quantidade: "", tamanho: "",  roupaId: "",  clienteId: "" },
      pedido:{frete: "", valorTotalVenda: "", status: "", clienteId: "" },
      roupas: [],
      itensCarrinho: [],
      tamanhos: [{ id: "PP", descricao: "PP" }, { id: "P", descricao: "P" }, { id: "M", descricao: "M" }, { id: "G", descricao: "G" }, { id: "GG", descricao: "GG" }],
      quantidades: [{ id: "1", descricao: "1" }, { id: "2", descricao: "2" }, { id: "3", descricao: "3" }, { id: "4", descricao: "4" }, { id: "5", descricao: "5" }, { id: "6", descricao: "6" }, { id: "7", descricao: "7" }, { id: "8", descricao: "8" }, { id: "9", descricao: "9" } , { id: "10", descricao: "10" }]
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

  async handleAdicionarCarrinho(roupa) {
    try {
      let itemCarrinho = this.state.itemCarrinho;
      var clienteId = localStorage.getItem('clienteId');
      itemCarrinho.clienteId = clienteId;
      itemCarrinho.roupaId = roupa.id;
      var response = await apiPost("/ItemCarrinho/", itemCarrinho);
      window.location.href = ("/CarrinhoCliente");
    } catch (error) {
      console.log(error);
    }
  }

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    console.log(name, value);
    const updated = updateStateValue(this.state, name, value);
    await this.setState({
      updated,

    });
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
              <LSelect
                  label="Tamanho"
                  items={this.state.tamanhos}
                  name="itemCarrinho.tamanho"
                  required
                  value={this.state.itemCarrinho.tamanho}
                  onChange={this.handleInputChange.bind(this)}
                />
              <Card.Title style={{
                color: "#755721",
                margin: '1em'
  
              }} >
                Quantidade
              </Card.Title>
              <LSelect
                  label="Quantidade"
                  items={this.state.quantidades}
                  name="itemCarrinho.quantidade"
                  required
                  value={this.state.itemCarrinho.quantidade}
                  onChange={this.handleInputChange.bind(this)}
                />
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


