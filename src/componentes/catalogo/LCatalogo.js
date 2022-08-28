import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../../App.css";
import { apiGet, apiPost } from "../../util/apiutil";

export default class LCatalogo extends Component {
  constructor(props) {
    super(props);
    this.state = { roupas:[] 
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

  // async handleAddToCart(disc) {
  //   try {
  //     await apiPost(process.env.REACT_APP_ADD_CART_PRODUCT_ITEM_ENDPOINT, {
  //       id: disc.id,
  //     });
  //     await apiGet(process.env.REACT_APP_CART_ENDPOINT);
  //   //   handleSetAlert(
    //     this.setState.bind(this),
    //     [`${disc.name} Adicionado ao carrinho`],
    //     "Sucesso",
    //     "success"
    //   );
   // } catch (error) {
      //handleErrorMessage(this.setState.bind(this), error);
   // }
  //}
  render() {
    // const catalog = this.state.roupas.map((roupa, i) => (
    //   <Col md={4}>
    //     <div className="mx-3 mb-4">
    //       <Card>
    //         <Card.Img
    //           variant="top"
    //           src={`${roupa.url}`}
    //           style={{ width: "100%", height: "275px" }}
    //         />
    //         <Card.Body>
    //           <Card.Title>{`${roupa.nome}`}</Card.Title>
    //           <Card.Text>
    //             <strong>R${roupa.preco}</strong>
    //             <p>{roupa.descricao}</p>
    //           </Card.Text>
    //           <Button
    //             /*variant="dark"*/
    //             block
    //             onClick={() => {
    //               this.handleAddToCart(roupa);
    //             }}
    //           >
    //             <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
    //             Adicionar ao carrinho
    //           </Button>
    //         </Card.Body>
    //       </Card>
    //     </div>
    //   </Col>
    // ));

    <Col md={4}>
       <div className="mx-3 mb-4">
           <Card>
             <Card.Img
              variant="top"
              src="https://img.ltwebstatic.com/images3_pi/2021/11/05/163607897391ffb3fe97a9ee4db756b6a9451d08fe_thumbnail_600x.webp"            
                style={{ width: "100%", height: "275px" }}
            />
            <Card.Body>
              <Card.Title>Jaqueta</Card.Title>
              <Card.Text>
                <strong>R$50,00</strong>
                <p>Couro</p>
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
        </div>
      </Col>

    return (
      <>

        <Row></Row>
      </>
     );
  }
}
