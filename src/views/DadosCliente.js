// import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import LForm from "../componentes/form/LForm";
import FormLayout from "../layout/FormLayout";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import { apiGet } from "../util/apiutil";
import LTable from "../componentes/table/LTable";
import LSelect from "../componentes/form/LSelect";
import { apiPost, apiPut, apiDelete } from "../util/apiultil";

export default class DadosCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente:{enderecoCobranca:{cidade:{estado:{pais:{}}}}}, clientes:[], cidades:[], estados:[], paises:[] 
       }
        
    }

    async componentDidMount() {
        await this.consultaCidade();
        await this.consultaEstado();
        await this.consultaPais();
        await this.consultaClientes();
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

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state)
    
        try {
            console.log(this.state.cliente)
           await apiPut("/Cliente/" + this.state.cliente.id, this.state.cliente)     
           window.location.href = "/HomeAtualizadoSucesso";

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
          enderecoCobranca:selectedRow,
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
    
        try {
            console.log(this.state.cliente)
           await apiDelete("/Cliente" , this.state.cliente.id)     
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
                    <LForm onSubmit={this.handleSubmit.bind(this)} customSubmitText='Atualizar Dados' onCancel={this.sair} onDelete={this.excluir.bind(this)} customDeleteText='Excluir'> 
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
                                    name="cliente.enderecoCobranca.tipoLogradouro"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDENCIA"
                                    name="cliente.enderecoCobranca.tipoResidencia"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="cliente.enderecoCobranca.logradouro"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="cliente.enderecoCobranca.numero"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="cliente.enderecoCobranca.bairro"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="cliente.enderecoCobranca.cep"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                /> 
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput 
                                    label="CIDADE"
                                    //items={this.state.cidades}
                                    name="cliente.enderecoCobranca.cidade.descricao"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.cidade.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="ESTADO"
                                    //items={this.state.estados}
                                    name="cliente.enderecoCobranca.cidade.estado.descricao"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.cidade.estado.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                               <LInput
                                    label="PAIS"
                                    //items={this.state.paises}
                                    name="cliente.enderecoCobranca.cidade.estado.pais.descricao"
                                    required
                                    value={this.state?.cliente?.enderecoCobranca?.cidade.estado.pais.descricao}
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



