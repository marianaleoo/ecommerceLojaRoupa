import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../../App.css";
// import { apiGet, apiPost } from "../../utils/api/api-utils";
// // import {
// //   alertMessageUtil,
// //   handleErrorMessage,
// //   handleSetAlert,
// // } from "../../utils/utils";
// import SSAlert from "../alert/SSalert";
export default class LCatalogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

//   async handleAddToCart(disc) {
//     try {
//       await apiPost(process.env.REACT_APP_ADD_CART_PRODUCT_ITEM_ENDPOINT, {
//         id: disc.id,
//       });
//       await apiGet(process.env.REACT_APP_CART_ENDPOINT);
//       handleSetAlert(
//         this.setState.bind(this),
//         [`${disc.name} Adicionado ao carrinho`],
//         "Sucesso",
//         "success"
//       );
//     } catch (error) {
//       handleErrorMessage(this.setState.bind(this), error);
//     }
//   }
  render() {
    const { discs } = this.props;
    const catalog = discs.map((disc, i) => (
      <Col md={4}>
        <div className="mx-3 mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={`${disc.imgLink}`}
              style={{ width: "100%", height: "275px" }}
            />
            <Card.Body>
              <Card.Title>{`${disc.name}`}</Card.Title>
              <Card.Text>
                <strong>R${disc.value}</strong>
                <p>{disc.description}</p>
                {/* Some quick example text to build on the card title and make up
                the bulk of the card's content. */}
              </Card.Text>
              <Button
                variant="dark"
                block
                onClick={() => {
                  this.handleAddToCart(disc);
                }}
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

        <Row>{catalog}</Row>
      </>
     );
  }
}
