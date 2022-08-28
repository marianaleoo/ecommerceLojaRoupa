import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
/*import SsInput from "../form/SSInput";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default class MeuCarrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carrinhoItems: [{}],
    };
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const carrinho = [];

    // for (let i = 0; i < 5; i++) {
        carrinho.push(
        <Row>
          <Card className="w-100">
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img
                    className="w-100 h-100"
                    src={`https://i.pinimg.com/564x/36/d5/d6/36d5d6948bd7548e933756eec447c23b.jpg`}
                    style={{
                      objectFit: "contain",
                    }}
                    alt="imgName"
                  />
                </Col>
                <Col md={6}>
                  <div className="p-2 mt-3">
                    <h4>Conjunto Estampado Pérola</h4>
                    <h5>Valor: R$60,00</h5>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-2">
                    <Button variant="secondary" block>
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                      Remover
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img
                    className="w-100 h-100"
                    src={`https://i.pinimg.com/564x/62/00/0a/62000a8d9a1d8cf2c1a7c414f4cdc35f.jpg`}
                    style={{
                      objectFit: "contain",
                    }}
                    alt="imgName"
                  />
                </Col>
                <Col md={6}>
                  <div className="p-2 mt-3">
                    <h4>Vestido Branco Laila</h4>
                    <h5>Valor: R$50,00</h5>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-2">
                    <Button variant="secondary" block>
                      <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                      Remover
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      );
    // }

    return <div>{carrinho}</div>;
  }
}
