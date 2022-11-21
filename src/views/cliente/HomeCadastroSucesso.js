
import { Button } from "bootstrap";
import React, { Component } from "react";
import { Alert, Navbar } from "react-bootstrap";
import LayoutUpdate from "../../layout/LayoutFinalizarCompra";

export default class HomeCadastroSucesso extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
                <LayoutUpdate>
                    <Alert key='1' variant={'primary'}>
                        Cadastrado com sucesso!
                    </Alert>
                </LayoutUpdate>
            </>
        );
    }
}
