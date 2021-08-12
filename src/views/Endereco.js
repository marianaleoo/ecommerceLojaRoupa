import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import LTable from "../componentes/table/LTable";

export default class Endereco extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente: {logradouro: "", numero: "", bairro: "", cep: "", cidade: "", estado: "", pais: "", descricao: ""}};
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
        const columns = [
            {
              dataField: "descricao",
              text: "DESCRICAO",
            },
            {
              dataField: "logradouro",
              text: "LOGRADOURO",
            },
            {
                dataField: "cidade.nome",
                text: "CIDADE",
            },
          ];
        const data= [
            {
                descricao: 'Casa',
                logradouro: 'Rua Benedito',
                cidade:{
                    nome: 'Mogi das Cruzes'
                }
                
            },
            {
                descricao: 'Trabalho',
                logradouro: 'Rua Joao',
                cidade:{
                    nome: 'Mogi das Cruzes'
                }
            }
        ]
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Seus endereços
                    </Card.Title>
                    <hr />
                    <LTable data={data} columns={columns}></LTable>
                    <LForm onSubmit={this.handlePreventDefaut}>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de entrega</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="DESCRICAO"
                                    name="cliente.descricao"
                                    required
                                    value={this.state.cliente.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
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
