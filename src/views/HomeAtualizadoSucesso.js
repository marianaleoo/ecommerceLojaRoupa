
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Layout from "../layout/Layout";

export default class HomeAtualizadoSucesso extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
                <Layout>
                    <Alert key='1' variant={'primary'}>
                        Atualizado com sucesso!
                    </Alert>
                </Layout>
            </>
        );
    }
}
