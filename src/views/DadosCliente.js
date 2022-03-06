// import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import LForm from "../componentes/form/LForm";
import FormLayout from "../layout/FormLayout";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import { apiGet, apiPost } from "../util/apiutil";
import LTable from "../componentes/table/LTable";

export default class DadosCliente extends Component {
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

    // async handleSubmit(event) {
    //     event.preventDefault();
    //     event.stopPropagation();
    
    //     try {
    //        console.log(this.state.cliente)
    //        await apiPost("/Cliente/{id}", this.state.cliente)     
    //        window.location.href = "/HomeAtualizadoSucesso";

    //    } catch (error) {
    //       console.log(error);
    //     }

    //   }

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

    rowEvents = {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          this.handleSelectedRow(row);
        },
      };
    
      render() {
        const columns = [
            {
              dataField: "nome",
              text: "NOME COMPLETO",
              events: this.rowEvents,
            },
            {
              dataField: "dataNascimento",
              text: "DATA DE NASCIMENTO",
              events: this.rowEvents,
            },
            {
                dataField: "cpf",
                text: "CPF",
                events: this.rowEvents,
              },
          ];

        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Meus Dados
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.clientes} columns={columns}></LTable>
                    <LForm onSubmit={this.handleSubmit} customSubmitText='Atualizar Dados' onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'> 
                         <Form.Row>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME COMPLETO"
                                    name="cliente.nome"
                                    value={this.state.cliente.nome}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="GÊNERO"
                                    name= "cliente.genero"
                                    required
                                    value={this.state.cliente.genero}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="DATA DE NASCIMENTO"
                                    name= "cliente.dataNascimento"
                                    required
                                    value={this.state.cliente.dataNascimento}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CPF"
                                    name= "cliente.cpf"
                                    required
                                    value={this.state.cliente.cpf}
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
                                    type="password"
                                    required
                                    value={this.state.cliente.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CONFIRMAR SENHA"
                                    type="password"
                                    name="cliente.confirmarSenha"
                                    required
                                    value={this.state.cliente.confirmarSenha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de cobrança</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="cliente.tipoLogradouroCobrancaa"
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



