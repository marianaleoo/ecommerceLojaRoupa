
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import LayoutUpdate from "../../layout/LayoutFinalizarCompra";

export default class HomeExcluidoSucesso extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
                <LayoutUpdate>
                    <Alert key='1' variant={'primary'}>
                        Excluído com sucesso!
                    </Alert>
                </LayoutUpdate>
            </>
        );
    }
}
