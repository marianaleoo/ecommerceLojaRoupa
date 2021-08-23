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
        this.state = {cliente: {cpf: "444.333.222-11", dataNascimento: "5/12/1997", genero: "Feminino", nome: "Mariana Léo", email: "marianaleo@fatec.sp.gov.sp", telefone: "+55 11 9 998385529", senha: "1234", confirmarSenha: "1234", logradouro: "Rua Pedro Paulo dos Santos", numero: "3175", bairro: "Jundiapeba", cep: "08750-710", cidade: "Mogi das Cruzes", estado: "São Paulo",  pais: "Brasil"  }};
    }
    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    async atualizadoSucesso(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/HomeAtualizadoSucesso";
    }

    async sair(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/";
    }

    async excluir(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/HomeExcluidoSucesso";
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
                   
                    <LForm onSubmit={this.atualizadoSucesso} customSubmitText='Atualizar Dados' onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'> 
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
                                    label="GÊNERO"
                                    required
                                    value={this.state.cliente.genero}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="DATA DE NASCIMENTO"
                                    required
                                    value={this.state.cliente.dataNascimento}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CPF"
                                    required
                                    value={this.state.cliente.cpf}
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
