import React, { Component } from "react";
import App from "../App";
import LCarrosel from "../componentes/carrosel/LCarrosel";
import LCatalogoTeste from "../componentes/catalogo/LCatalogoTeste";
import LNavbar from "../componentes/navbar/LNavbar";

export default class LayoutUpdate extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#ffffff"
          }}
        >
            <LNavbar />
          <main style={{ flexGrow: "1" }}>{children}</main>
          <footer className="p-2 ">
            <p className="text-center m-0">Loja Mariana</p>
            <p className="text-center m-0">Mariana Léo</p>
            <p className="text-center m-0">Fatec Mogi das Cruzes 2022</p>
          </footer>
        </div>
      </>
    );
  }
}
