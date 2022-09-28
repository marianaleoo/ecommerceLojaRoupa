import { faCartPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, ButtonGroup, Card, CardGroup, Col, Row } from "react-bootstrap";
import "../../App.css";
import LayoutRoupa from "../../layout/LayoutRoupa";
import { apiGet, apiPost } from "../../util/apiutil";
import LCard from "../form/LCard";

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
    return (
      <div>
        {this.state.roupas.map((roupa, i) => {
          return (
            <div>
                <LayoutRoupa>
            <CardGroup>
               <Card>
                <Card.Img
                  variant="top"
                  src={`${roupa.url}`}
                  style={{ width: "100%", height: "275px" }}
                />
                <Card.Body>
                  <Card.Title>{`${roupa.nome}`}</Card.Title>
                  <Card.Text>
                    <strong>R${`${roupa.preco}`}</strong>
                    <p>{`${roupa.descricao}`}</p>
                  </Card.Text>
                  <Button
                  /*variant="dark"*/
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
            </CardGroup>
          </LayoutRoupa>
            </div>
          );
        })}
      </div>
    );
  }
}

