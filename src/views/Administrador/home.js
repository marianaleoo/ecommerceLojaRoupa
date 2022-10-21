import { Component } from "react";
import { Container } from "react-bootstrap";
import LAlerta from "../../componentes/alerta/LAlerta";
import LCarrosel from "../../componentes/carrosel/LCarrosel";
import LCatalogoTeste from "../../componentes/catalogo/LCatalogoTeste";
import Layout from "../../layout/Layout";
import { apiGet } from "../../util/apiutil";
// import {
//   alertMessageUtil,
//   handleErrorMessage,
//   updateStateValue,
// } from "../../utils/utils";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    //const updated = updateStateValue(this.state, name, value);
    await this.setState({
      //updated,
    });
  }
  render() {
    return (
      <Layout>
        <Container>
          <LCarrosel className="mb-5 mt-5" />

          {/* <Container>
            <LAlerta
              showAlert={this.state.alert.show}
              messages={this.state.alert.messages}
              variant={this.state.alert.variant}
              title={this.state.alert.title}
            /> 
          </Container> */}
          <hr></hr>
          <LCatalogoTeste  />
        </Container>
      </Layout>
    );
  }
}
