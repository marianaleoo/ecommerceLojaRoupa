import { faCartPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, CardGroup, Col, Row } from "react-bootstrap";
import "../../App.css";
import LayoutRoupa from "../../layout/LayoutRoupa";
import { apiGet, apiPost } from "../../util/apiutil";
import LAlerta from "../alerta/LAlerta";

export default class LCatalogoTeste extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roupa: { nome: "", codigo: "", tecido: "", descricao: "", ativo: true, tamanho: "", preco: "", url: "", },
      roupas: [],
    };
  }

  async componentDidMount() {
    await this.consultaRoupas();
  }

  async consultaRoupas() {
    try {
      let roupas = await apiGet("/Roupa");
      console.log(roupas);

      this.setState({
        roupas,
      });
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { roupas } = this.props;
    const catalog = this.state.roupas.map((roupa, i) => (
        <Col md={4}>
          <div className="mx-3 mb-4">
            <Card
               style={{margin: "3em", marginRight: "5em",  marginLeft: "5em"}}>
              <Card.Img
                variant="top"
                src={`${roupa.url}`}
                style={{ width: "100%", height: "275px" }}
              />
              <Card.Body>
                <Card.Title>{`${roupa.nome}`}</Card.Title>
                <Card.Text>
                  <strong>R${roupa.preco}</strong>
                  <p>{roupa.descricao}</p>
                  {/* Some quick example text to build on the card title and make up
                the bulk of the card's content. */}
                </Card.Text>
                <Button
                // variant="dark"
                // block
                // onClick={() => {
                //   this.handleAddToCart(roupa);
                // }}
                >
                  <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                  Adicionar ao carrinho
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>

    ));

    return (
      <>
        <LAlerta
          showAlert={this.state.alert}
        />
        <Row>{catalog}</Row>
      </>
    );
  }
}

