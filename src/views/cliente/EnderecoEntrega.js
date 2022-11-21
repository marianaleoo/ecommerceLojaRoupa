import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LForm from "../../componentes/form/LForm";
import LInput from "../../componentes/form/LInput";
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable";
import { apiDelete, apiGet, apiPost } from "../../util/apiutil";
import LSelect from "../../componentes/form/LSelect";

export default class EnderecoEntrega extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: {
             enderecoEntrega: { tipoLogradouro: "", tipoResidencia: "", logradouro: "", numero: "", bairro: "", cep: "", cidadeId: "", cidade: {estadoId: "", estado:{  paisId: ""}} , tipoEnderecoId: "" },
            },
        cidades:[], 
        estados:[], 
        paises:[] 
       }
        
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
            var clienteId = localStorage.getItem('clienteId');
            this.state.cliente.enderecoEntrega.clienteId = clienteId;
            await apiPost("/EnderecoEntrega", this.state.cliente.enderecoEntrega)
            console.log(this.state.cliente.enderecoEntrega);
            window.location.href = "/HomeCadastroSucesso";

        } catch (error) {
            console.log(error);
        }

    }

    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
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
        window.location.href = "/HomeCadastroSucesso";
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
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Novo endereço 
                    </Card.Title>
                    <hr />
                    <LForm  onSubmit={this.handleSubmit.bind(this)} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de entrega</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="cliente.enderecoEntrega.tipoLogradouro"
                                    required
                                    value={this.state.cliente.enderecoEntrega.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.enderecoEntrega.tipoResidencia"
                                    required
                                    value={this.state.cliente.enderecoEntrega.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.enderecoEntrega.logradouro"
                                    required
                                    value={this.state.cliente.enderecoEntrega.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.enderecoEntrega.numero"
                                    required
                                    value={this.state.cliente.enderecoEntrega.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.enderecoEntrega.bairro"
                                    required
                                    value={this.state.cliente.enderecoEntrega.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.enderecoEntrega.cep"
                                    required
                                    value={this.state.cliente.enderecoEntrega.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCidade">
                            <LSelect
                                    label="Cidade"
                                    items={this.state.cidades}
                                    name="cliente.enderecoEntrega.cidadeId"
                                    required
                                    value={this.state.cliente.enderecoEntrega.cidadeId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                            <LSelect
                                    label="Estado"
                                    items={this.state.estados}
                                    name="cliente.enderecoEntrega.cidade.estadoId"
                                    required
                                    value={this.state.cliente.enderecoEntrega.cidade.estadoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPais">
                            <LSelect
                                    label="Pais"
                                    items={this.state.paises}
                                    name="cliente.enderecoEntrega.cidade.estado.paisId"
                                    required
                                    value={this.state.cliente.enderecoEntrega.cidade.estado.paisId}
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
