import { Component } from "react";
import { Container } from "react-bootstrap";
import LAlerta from "../../componentes/alerta/LAlerta";
import LCarrosel from "../../componentes/carrosel/LCarrosel";
import LCatalogo from "../../componentes/catalogo/LCatalogo";
// import DiscSearchForm from "../../components/disc/discSearchForm";
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
     // alert: alertMessageUtil(),
    //   discFilter: {
    //     active: null,
    //     description: null,
    //     name: null,
    //     recorder: null,
    //     artist: null,
    //     genre: null,
    };
  }
  async componentDidMount() {
    await this.fetchDiscs();
  }
  async fetchDiscs() {
    try {
      let discs = await apiGet(process.env.REACT_APP_DISC_ENDPOINT);
      this.setState({
        discs,
      });
    } catch (error) {
      //handleErrorMessage(this.setState.bind(this), error);
    }
  }

  async handleSubmit() {
    const { discFilter } = this.state;
    try {
      let discs = await apiGet(process.env.REACT_APP_DISC_ENDPOINT, discFilter);
      console.log(discs);
      if (discFilter.artist || discFilter.genre || discFilter.recorder) {
        discs = discs
          .filter((d) => {
            if (discFilter.artist) {
              return d.artists.find((a) => a.id == discFilter.artist);
            }
            return true;
          })
          .filter((d) => {
            if (discFilter.genre) {
              return d.genres.find((g) => g.id == discFilter.genre);
            }
            return true;
          });
      }
      this.setState({
        discs,
      });
    } catch (error) {
      //handleErrorMessage(this.setState.bind(this), error);
    }
  }
  async handleInputChange(event) {
    const target = event.target;
    let { name, value } = target;
    //const updated = updateStateValue(this.state, name, value);
    await this.setState({
      //updated,
    });
  }
  handleClear() {
    this.setState({
      discFilter: {
        active: null,
        description: null,
        name: null,
        recorder: null,
        artist: null,
        genre: null,
      },
    });
  }
  render() {
    return (
      <Layout>
        <Container>
          <LCarrosel className="mb-5 mt-5" />

          <Container>
            {/* <LAlerta
              showAlert={this.state.alert.show}
              messages={this.state.alert.messages}
              variant={this.state.alert.variant}
              title={this.state.alert.title}
            /> */}
            {/* <DiscSearchForm
              root={"discFilter"}
              disc={this.state.discFilter}
              onChange={this.handleInputChange.bind(this)}
              handleErrorMessage={(error) => {
                handleErrorMessage(this.setState.bind(this), error);
              }}
              onCancel={this.handleClear.bind(this)}
              onSubmit={this.handleSubmit.bind(this)}
            /> */}
          </Container>
          <hr></hr>
          <LCatalogo  />
        </Container>
      </Layout>
    );
  }
}
