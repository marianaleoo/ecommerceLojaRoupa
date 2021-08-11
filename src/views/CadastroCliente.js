import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";

export default class CadastroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente: {nome: "", email: "", telefone: "", senha: "", confirmarSenha: ""}};
    }
    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    async handleInputChange(event) {
        const target = event.target;
        let { name, value } = target;
        console.log(name, value);
        const updated = updateStateValue(this.state, name, value);
        await this.setState({
          updated,
        });
      }

    async AlteraNomeInput(event){
        const target = event.target;
        let { value } = target;
        this.setState({cliente: {...this.state.cliente,  nome: value}})
        console.log( this.state);
    }

    render() {
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Cadastre-se
                    </Card.Title>
                    <hr />
                   
                    <LForm onSubmit={this.handlePreventDefaut}>
                        <Form.Row>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME COMPLETO"
                                    required
                                    value={this.state.cliente.nome}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="E-MAIL"
                                    name="cliente.email"
                                    required
                                    value={this.state.cliente.email}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TELEFONE"
                                    name="cliente.telefone"
                                    required
                                    value={this.state.cliente.telefone}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="SENHA"
                                    name="cliente.senha"
                                    required
                                    value={this.state.cliente.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CONFIRMAR SENHA"
                                    name="cliente.confirmarSenha"
                                    required
                                    value={this.state.cliente.confirmarSenha}
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
