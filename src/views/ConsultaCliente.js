import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import LTable from "../componentes/table/LTable";
import { apiDelete, apiGet, apiPut } from "../util/apiultil";

export default class ConsultaCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {atualizando: false, cliente: {id: "", cpf: "", dataNascimento: "", genero: "", nome: "", email: "", telefone: "", senha: "", confirmarSenha: ""},clientes:[]};
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
          atualizando: true
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
           await apiDelete("/Cliente" , this.state.cliente.id)     
           window.location.href = "/HomeExcluidoSucesso";

       } catch (error) {
          console.log(error);
        }

      }

      async altera(event) {
        event.preventDefault();
        event.stopPropagation();
    
        try {
           console.log(this.state.cliente)
           await apiPut("/Cliente/" + this.state.cliente.id, this.state.cliente)     
           window.location.href = "/HomeAtualizadoSucesso";

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
              dataField: "id",
              text: "CÓDIGO",
              events: this.rowEvents,
            },
            {
              dataField: "nome",
              text: "Nome",
              events: this.rowEvents,
            },
            {
                dataField: "genero",
                text: "Gênero",
                events: this.rowEvents,
            },
          ];

        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Atualizar cliente
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.clientes} columns={columns}></LTable>
                    <LForm onSubmit={this.altera.bind(this)} onCancel={this.sair.bind(this)} onDelete={this.excluir.bind(this)}>
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
                        </Form.Row>
                    </LForm>
                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
