import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../../App.css";
import { apiGet, apiPost } from "../../util/apiutil";
import { handleErrorMessage, handleSetAlert } from "../../util/util";
import LAlerta from "../alerta/LAlerta";
export default class SSCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
       itemCarrinho: {quantidade: "", roupaId: "", carrinhoCompraId: ""},
        roupas: []
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

  async consultaClienteCarrinho(){
      
  }

// ter o cliente id e resgatar o carrinho desse cliente, adicionar a roupa no item e o item no carrinho
  async handleAdicionaCarrinho(roupa) {
    try {
      await apiPost("/ItemCarrinho/", {roupaId : roupa.id} );
      window.location.href = "/DetalheRoupa";

      //await apiGet("/ItemCarrinho/", {id : id} );
      // handleSetAlert(
      //   this.setState.bind(this), 
      //   [`${roupa.nome} Adicionado ao carrinho`],
      //   "Sucesso",
      //   "success"
      // );
    } catch (error) {

      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleDetalheRoupa(){
    try{

    }catch(error){
      handleErrorMessage(this.setState.bind(this), error);
    }
  }

  render() {
    const { roupas } = this.props;
    const catalog = this.state.roupas.map((roupa, i) => (
      <Col md={4}>
        <div className="mx-3 mb-4">
          <Card   style={{margin: "3em", marginRight: "5em",  marginLeft: "5em"}}>
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
              <Button
                variant="dark"
                block
                onClick={() => {
                  this.handleAdicionaCarrinho(roupa);

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
        <LAlerta
            showAlert={this.state.alert}
            messages={this.state.alert}
            variant={this.state.alert}
            title={this.state.alert}
        />
        <Row>{catalog}</Row>
      </>
    );
  }
}