import { Component } from 'react';
import { Row, Button, ButtonGroup, Card, CardGroup, Col, DropdownButton, Form, FormGroup } from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faShoppingCart, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { apiGet, apiPost, apiPut } from '../../util/apiutil';
import LAlerta from '../../componentes/alerta/LAlerta';
import LInput from '../../componentes/form/LInput';
import LSelect from '../../componentes/form/LSelect';
import { updateStateValue } from '../../util/util';

export default class CarrinhoCliente extends Component {
  constructor(props) {
    super(props)
    this.state = {
      compra: { status: "EM_PROCESSAMENTO", cartaoCreditoId: "", cupomTrocaId: "", enderecoEntregaId: "", clienteId: "", valorTotal: "" },
      codigoCupomTroca: "",
      itensCarrinho: [],
      enderecosEntrega: [],
      cartoesCredito: [],
    }
  };

  async componentDidMount() {
    await this.consultaCarrinhoCompra();
    await this.consultaClienteEndereco();
    await this.consultaClienteCartão();

  }

  async consultaClienteEndereco() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      let enderecoEntrega = await apiGet("/EnderecoEntrega" + "/" + clienteId)

      this.setState({
        enderecosEntrega: enderecoEntrega

      });
    } catch (error) {
      console.log(error);
    }

  }

  async consultaClienteCartão() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      let cartaoCredito = await apiGet("/CartaoCredito" + "/" + clienteId)

      this.setState({
        cartoesCredito: cartaoCredito

      });
    } catch (error) {
      console.log(error);
    }

  }

  async consultaCarrinhoCompra() {
    try {
      var clienteId = localStorage.getItem('clienteId');
      let cliente = await apiGet("/Cliente" + "/" + clienteId);

      this.setState({
        itensCarrinho: cliente[0].carrinho.itensCarrinho
      });
    } catch (error) {
      console.log(error);
    }
  }

  async finalizarCompra() {
    try {
      console.log(this.state.compra);
      let compra = this.state.compra;
      var clienteId = localStorage.getItem('clienteId');
      compra.clienteId = clienteId
      compra.cupomTrocaId = this.state.codigoCupomTroca[0].id;
      await apiPost("/Compra", compra)

      window.location.href = ("/HomeFinalizaCompra");

    } catch (error) {
      console.log(error);
    }
  }

  async salvarEnderecoCompra(enderecoEntrega) {
    try {

      console.log(enderecoEntrega)
      this.setState({
        enderecoEntrega1: enderecoEntrega
      })
    } catch (error) {
      console.log(error);
    }
  }

  async aplicarCupom(){
    try {
      let cupomTroca = this.state.codigoCupomTroca
      console.log(cupomTroca);
      let codigoCupom = await apiGet("/CupomTroca/ConsultaCupom/" + cupomTroca )
      console.log(codigoCupom);

      this.setState({
        codigoCupomTroca: codigoCupom[0].codigo
      });
      
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
    return (
      <FormLayout>
        <Col md={12}>
          <div className="mx- mb-4">
            <Card.Title style={{
              color: "#755721",
              margin: '5'

            }} >
              Meu carrinho
            </Card.Title>
            <CardGroup>
              {this.state.itensCarrinho.map((itemCarrinho, roupaId) => (
                <Col md={6}>
                  <div className="mx-3 mb-4">
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
                  </div>
                </Col>
              ))}
              <Col md={12}></Col>
              <Card style={{ margin: "3em", marginRight: "5em", marginLeft: "5em" }}>
                <Card.Title style={{
                  color: "#755721"
                }}>Selecione um endereço de entrega cadastrado: </Card.Title>
                <LSelect
                  label="Endereços"
                  items={this.state.enderecosEntrega.map((e) => { return { id: e.id, descricao: e.logradouro + " " + e.numero } })}
                  name="compra.enderecoEntregaId"
                  required
                  value={this.state.compra.enderecoEntregaId}
                  onChange={this.handleInputChange.bind(this)}
                />
                <p></p>
                <Button href="/EnderecoEntrega" style={{
                  color: "#755721"
                }}>Adicionar novo endereço de entrega</Button>
                <p></p>
                <Card.Title style={{
                  color: "#755721"
                }}>Selecione uma forma de pagamento cadastrado: </Card.Title>
                <LSelect
                  label="Cartões de crédito"
                  items={this.state.cartoesCredito.map((c) => { return { id: c.id, descricao: c.numeroCartao } })}
                  name="compra.cartaoCreditoId"
                  required
                  value={this.state.compra.cartaoCreditoId}
                  onChange={this.handleInputChange.bind(this)}
                />
                <p></p>
                <Button href="/FormaPagamento" style={{
                  color: "#755721"
                }}>Adicionar nova forma de pagamento</Button>
                <p></p>
                <LInput
                  label="Cupom Troca"
                  name="codigoCupomTroca"
                  required
                  value={this.state.codigoCupomTroca}
                  onChange={this.handleInputChange.bind(this)}
                />
                <Button style={{
                  color: "#755721", margin: "2em", marginRight: "10em", marginLeft: "30em"
                }} onClick={() => {
                  this.aplicarCupom();
                }}>Aplicar cupom </Button>
              </Card>

            </CardGroup>
            <Button style={{
              color: "#755721", margin: "2em", marginRight: "10em", marginLeft: "30em"
            }} onClick={() => {
              this.finalizarCompra();
            }}>Finalizar compra</Button>
          </div>
        </Col>
      </FormLayout>

    );

  };
}
