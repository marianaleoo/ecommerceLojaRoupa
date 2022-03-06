import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import { apiPost } from "../util/apiutil";

export default class CadastroRoupa extends Component {
    constructor(props) {
        super(props);
        this.state = {roupa: {tamanho: "", descricao: "", tecido: "", nome: "", codigo: "", url:"", preco: ""}};
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    
        try {
           console.log(this.state.roupa)
           await apiPost("/Roupa", this.state.roupa)     
           window.location.href = "/HomeCadastroSucesso";

       } catch (error) {
          console.log(error);
        }

      }

    async cadastroSucesso(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/HomeCadastroSucesso";
    }

    async sair(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/";
    }

    async handleInputChange(event) {
        const target = event.target;
        let { name, value } = target;
        const updated = updateStateValue(this.state, name, value);
        await this.setState({
          updated,
        });
      }

    render() {
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Cadastrar Roupa
                    </Card.Title>
                    <hr />
                   
                    <LForm onSubmit={this.handleSubmit.bind(this)} onCancel={this.sair.bind(this)}>
                        <Form.Row>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TAMANHO"
                                    name="roupa.tamanho"
                                    required
                                    value={this.state.roupa.tamanho}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="DESCRIÇÃO"
                                    name="roupa.descricao"
                                    required
                                    value={this.state.roupa.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                             <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TECIDO"
                                    name= "roupa.tecido"
                                    required
                                    value={this.state.roupa.tecido}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME"
                                    name="roupa.nome"
                                    required
                                    value={this.state.roupa.nome}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CODIGO"
                                    name="roupa.codigo"
                                    required
                                    value={this.state.roupa.codigo}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="URL"
                                    name="roupa.url"
                                    required
                                    value={this.state.roupa.url}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="PREÇO"
                                    name="roupa.preco"
                                    required
                                    value={this.state.roupa.preco}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                      </Form.Row>
                    </LForm>
                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
