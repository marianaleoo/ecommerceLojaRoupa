import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import LTable from "../componentes/table/LTable";
import { apiDelete, apiGet } from "../util/apiutil";

export default class Endereco extends Component {
    constructor(props) {
        super(props);
            this.state = {cliente:{}, clientes:[]}
    }

    async componentDidMount() {
        await this.consultaClientes();
    }
      async consultaClientes() {
        try {
          let clientes = await apiGet("/Cliente");
          console.log(clientes);
    
          this.setState({
            clientes,
          });
        } catch (error) {
          console.log(error);
        }
      }

    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
    }


    async alteraSucesso(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/HomeAlteradoSucesso";
    }

    async cadastroSucesso(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/HomeCadastroSucesso";
    }

    handleSelectedRow(row) {
        let selectedRow = (row);
    
        console.log(selectedRow);
        this.setState({
          cliente: selectedRow,
        });
      }

    async sair(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = "/";
    }

    async excluir(event) {
        event.preventDefault();
        event.stopPropagation();
    
        try {
           console.log(this.state.cliente)
           await apiDelete("/Cliente", this.state.cliente)     
           window.location.href = "/HomeExcluidoSucesso";

       } catch (error) {
          console.log(error);
        }

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

    rowEvents = {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.handleSelectedRow(row);
        },
      };

    render() {
        const columns = [
            {
              dataField: "cliente.cep",
              text: "CEP",
              events: this.rowEvents,
            },
            {
              dataField: "cliente.nome",
              text: "Nome",
              events: this.rowEvents,
            },
           ];

        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Seus endereços
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.clientes} columns={columns}></LTable>
                    <LForm  onSubmit={this.alteraSucesso} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de entrega</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="cliente.tipoLogradouro"
                                    required
                                    value={this.state.cliente.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.tipoResidencia"
                                    required
                                    value={this.state.cliente.tipoResidencia}
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
                                    required
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
