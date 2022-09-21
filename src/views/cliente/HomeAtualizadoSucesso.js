
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import LayoutUpdate from "../../layout/LayoutUpdate";

export default class HomeAtualizadoSucesso extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
            <LayoutUpdate>
                    <Alert key='1' variant={'primary'}>
                        Atualizado com sucesso!
                    </Alert>
                </LayoutUpdate>
            </>
        );
    }
}
