
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import Layout from "../layout/Layout";

export default class HomeCadastroSucesso extends Component {
    render() {
        const { children } = this.props;
        return (
            <>
                <Layout>
                    <Alert key='1' variant={'primary'}>
                        Cadastrado com sucesso!
                    </Alert>
                </Layout>
            </>
        );
    }
}
