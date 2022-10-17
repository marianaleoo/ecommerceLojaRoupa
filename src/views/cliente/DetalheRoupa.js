import { faCartPlus, faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Row, Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import LAlerta from '../../componentes/alerta/LAlerta';
import FormLayout from "../../layout/FormLayout";
import { apiGet } from '../../util/apiutil';

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCarrinho: { id: "", quantidade: "", roupaId: "" },
      roupas: [],
    };
  }

  async componentDidMount() {
    var clienteId = localStorage.getItem('clienteId');
    const roupaId = this.props.match.params.roupaId;
    await this.consultaItemCarrinho(roupaId);
    console.log(roupaId);
  }

  async consultaItemCarrinho(roupaId) {
    try {
      let roupas = await apiGet("/Roupa" + "/" + roupaId);
      console.log(roupas);

      this.setState({
        roupas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async adicionarCarrinho(){
    try {
      //   await apiPost("/ItemCarrinho/", {roupaId : roupa.id, clienteId: clienteId } );
    } catch (error) {
      
    }
  }

  render() {
    const { roupas } = this.props;
    const catalog = this.state.roupas.map((roupa, roupaId) => (
    <FormLayout>
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
              <Button style={{
                color: "#755721"
              }}>{roupa.tamanho}</Button>
            </ButtonGroup>
            <Card.Title style={{
              color: "#755721",

            }} >
              Quantidade
            </Card.Title>
            {/* <DropdownButton>
              <Dropdown.Item href="#/action-1">{itemCarrinho.quantidade}</Dropdown.Item>
            </DropdownButton> */}
              <Button
                variant="dark"
                block
                // onClick={() => {
                //   this.handleAdicionaCarrinho(roupa);
                // }}
              >
                <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                Adicionar item no carrinho
              </Button>
          </Card.Body>
        </Card>
        </CardGroup>
        </FormLayout>
    ));
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


