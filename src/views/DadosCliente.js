import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import LForm from "../componentes/form/LForm";
import FormLayout from "../layout/FormLayout";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";

export default class DadosCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente: {nome: "Mariana", email: "marianaleo@fatec.sp.gov.sp", telefone: "11 9 98998878", senha: "", confirmarSenha: "", logradouro: "Rua Benedito Souza", }};
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
                     Meus Dados
                    </Card.Title>
                    <hr />
                   
                    <LForm onSubmit={this.handlePreventDefaut} customSubmitText='Alterar' customCancelText='Sair'> 
                         <Form.Row>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME COMPLETO"
                                    value={this.state.cliente.nome}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="E-MAIL"
                                    name="cliente.email"
                                    value={this.state.cliente.email}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TELEFONE"
                                    name="cliente.telefone"
                                    value={this.state.cliente.telefone}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="SENHA"
                                    name="cliente.senha"
                                    type="password"
                                    value={this.state.cliente.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CONFIRMAR SENHA"
                                    type="password"
                                    name="cliente.confirmarSenha"
                                    value={this.state.cliente.confirmarSenha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de cobrança</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.logradouro"
                                    required
                                    value={this.state.cliente.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.numero"
                                    required
                                    value={this.state.cliente.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.bairro"
                                    type="password"
                                    value={this.state.cliente.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.cep"
                                    required
                                    value={this.state.cliente.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CIDADE"
                                    name="cliente.cidade"
                                    required
                                    value={this.state.cliente.cidade}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="ESTADO"
                                    name="cliente.estado"
                                    required
                                    value={this.state.cliente.estado}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="PAIS"
                                    name="cliente.pais"
                                    required
                                    value={this.state.cliente.pais}
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
