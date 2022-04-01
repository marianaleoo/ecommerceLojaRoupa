import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import { apiGet, apiPost } from "../util/apiultil";
import LSelect from "../componentes/form/LSelect";

export default class CadastroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: {
                cpf: "", dataNascimento: "", genero: "", nome: "", email: "", telefone: "", senha: "", confirmarSenha: "", enderecoCobranca: { tipoLogradouro: "", tipoResidencia: "", logradouro: "", numero: "", bairro: "", cep: "", cidadeId: "", estadoId: "", paisId: "" }
            },
            cidades:[],
            estados:[],
            paises:[]            
        };
    }

    async componentDidMount() {
        await this.consultaCidade();
        await this.consultaEstado();
        await this.consultaPais();
    }
    async consultaCidade() {
        try {
            let cidades = await apiGet("/Cidade");

            this.setState({
                cidades,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async consultaEstado() {
        try {
            let estados = await apiGet("/Estado");

            this.setState({
                estados,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async consultaPais() {
        try {
            let paises = await apiGet("/Pais");
            console.log(paises);

            this.setState({
                paises,
            });
        } catch (error) {
            console.log(error);
        }
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
        console.log(name, value);
        const updated = updateStateValue(this.state, name, value);
        await this.setState({
            updated,

        });
    }

    async AlteraNomeInput(event) {
        const target = event.target;
        let { value } = target;
        this.setState({ cliente: { ...this.state.cliente, nome: value } })
        console.log(this.state);
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
                                    name="cliente.cpf"
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
                                    name="cliente.enderecoCobranca.tipoLogradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.enderecoCobranca.tipoResidencia"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.enderecoCobranca.logradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.enderecoCobranca.numero"
                                    required
                                    value={this.state.cliente.enderecoCobranca.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.enderecoCobranca.bairro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.enderecoCobranca.cep"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                /> 
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LSelect
                                    label="CIDADE"
                                    items={this.state.cidades}
                                    name="cliente.enderecoCobranca.cidadeId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cidadeId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LSelect
                                    label="ESTADO"
                                    items={this.state.estados}
                                    name="cliente.enderecoCobranca.estadoId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.estadoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                               <LSelect
                                    label="PAIS"
                                    items={this.state.paises}
                                    name="cliente.enderecoCobranca.paisId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.paisId}
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
