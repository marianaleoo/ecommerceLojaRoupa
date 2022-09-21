import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import LayoutUpdate from "../../layout/LayoutUpdate";

export default class HomeFinalizaCompra extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
            <LayoutUpdate>
                    <Alert key='1' variant={'primary'}>
                        Compra realizada com sucesso! Acompanhe seus pedidos no menu Meus Pedidos.
                    </Alert>
                </LayoutUpdate>
            </>
        );
    }
}
