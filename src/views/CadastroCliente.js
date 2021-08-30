import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import { apiPost } from "../util/apiultil";

export default class CadastroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente: {cpf: "", dataNascimento: "", genero: "", nome: "", email: "", telefone: "", senha: "", confirmarSenha: "", tipoLogradouroCobranca: "", tipoResidenciaCobranca: "", logradouroCobranca: "", numeroCobranca: "", bairroCobranca: "", cepCobranca: "", cidadeCobranca: "", estadoCobranca: "", paisCobranca: "",  tipoLogradouroEntrega: "", tipoResidenciaEntrega: "", logradouroEntrega: "", numeroEntrega: "", bairroEntrega: "", cepEntrega: "", cidadeEntrega: "", estadoEntrega: "", paisEntrega: ""}};
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
    
        try {
           console.log(this.state.cliente)
           await apiPost("/Cliente", this.state.cliente)     
           window.location.href = "/HomeCadastroSucesso";

       } catch (error) {
          console.log(error);
        }

      }

    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
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
                   
                    <LForm onSubmit={this.handleSubmit.bind(this)} onCancel={this.sair.bind(this)}>
                        <Form.Row>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME COMPLETO"
                                    name="cliente.nome"
                                    required
                                    value={this.state.cliente.nome}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="GÊNERO"
                                    name="cliente.genero"
                                    required
                                    value={this.state.cliente.genero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="DATA DE NASCIMENTO"
                                    name="cliente.dataNascimento"
                                    required
                                    type="Date"
                                    value={this.state.cliente.dataNascimento}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CPF"
                                    name= "cliente.cpf"
                                    required
                                    value={this.state.cliente.cpf}
                                    onChange={this.handleInputChange.bind(this)}
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
                                    type="password"
                                    required
                                    value={this.state.cliente.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CONFIRMAR SENHA"
                                    name="cliente.confirmarSenha"
                                    type="password"
                                    required
                                    value={this.state.cliente.confirmarSenha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de cobrança</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="cliente.tipoLogradouroCobranca"
                                    required
                                    value={this.state.cliente.tipoLogradouroCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.tipoResidenciaCobranca"
                                    required
                                    value={this.state.cliente.tipoResidenciaCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.logradouroCobranca"
                                    required
                                    value={this.state.cliente.logradouroCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.numeroCobranca"
                                    required
                                    value={this.state.cliente.numeroCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.bairroCobranca"
                                    required
                                    value={this.state.cliente.bairroCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.cepCobranca"
                                    required
                                    value={this.state.cliente.cepCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CIDADE"
                                    name="cliente.cidadeCobranca"
                                    required
                                    value={this.state.cliente.cidadeCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="ESTADO"
                                    name="cliente.estadoCobranca"
                                    required
                                    value={this.state.cliente.estadoCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="PAIS"
                                    name="cliente.paisCobranca"
                                    required
                                    value={this.state.cliente.paisCobranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de entrega</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="cliente.tipoLogradouroEntrega"
                                    required
                                    value={this.state.cliente.tipoLogradouroEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.tipoResidenciaEntrega"
                                    required
                                    value={this.state.cliente.tipoResidenciaEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.logradouroEntrega"
                                    required
                                    value={this.state.cliente.logradouroEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.numeroEntrega"
                                    required
                                    value={this.state.cliente.numeroEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.bairroEntrega"
                                    required
                                    value={this.state.cliente.bairroEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.cepEntrega"
                                    required
                                    value={this.state.cliente.cepEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CIDADE"
                                    name="cliente.cidadeEntrega"
                                    required
                                    value={this.state.cliente.cidadeEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="ESTADO"
                                    name="cliente.estadoEntrega"
                                    required
                                    value={this.state.cliente.estadoEntrega}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="PAIS"
                                    name="cliente.paisEntrega"
                                    required
                                    value={this.state.cliente.paisEntrega}
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
