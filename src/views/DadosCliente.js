// import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
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
        this.state = {
            cliente: {
                cpf: "", dataNascimento: "", genero: "", nome: "", email: "", telefone: "", senha: "", confirmarSenha: "", enderecoCobranca: { tipoLogradouro: "", tipoResidencia: "", logradouro: "", numero: "", bairro: "", cep: "", cidadeId: "", estadoId: "", paisId: "", tipoEnderecoId: "" }, cartaoCredito: {numeroCartao: "", nomeCartao: "", bandeiraCartaoId: "", codigoSeguranca: ""}, 
            },
            clientes:[],
            bandeiras:[],
            tipoEnderecos: [],
            cidades: [],
            estados: [],
            paises: []
            
        };
    }

    async componentDidMount() {
        await this.consultaCidade();
        await this.consultaEstado();
        await this.consultaPais();
        await this.consultaClientes();
        await this.consultaTipoEndereco();
        await this.consultaBandeira();
    }

    async consultaTipoEndereco() {
        try {
            let tipoEnderecos = await apiGet("/TipoEndereco");

            this.setState({
                tipoEnderecos,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async consultaBandeira() {
        try {
            let bandeiras = await apiGet("/Bandeira");

            this.setState({
                bandeiras,
            });
        } catch (error) {
            console.log(error);
        }
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
              text: "Nome Completo",
              events: this.rowEvents,
            },
            {
              dataField: "dataNascimento",
              text: "Data Nascimento",
              events: this.rowEvents,
            },
            {
                dataField: "cpf",
                text: "Cpf",
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
                    <Form.Group as={Col} md={5}>
                        <h4 className="mt-5" style={{ color: "#755721" }}>Dados Pessoais</h4>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridNome">
                                <LInput
                                    label="Nome Completo"
                                    name="cliente.nome"
                                    required
                                    value={this.state.cliente.nome}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridGenero">
                                <LInput
                                    label="Gênero"
                                    name="cliente.genero"
                                    required
                                    value={this.state.cliente.genero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridDataNasc">
                                <LInput
                                    label="Data de Nascimento"
                                    name="cliente.dataNascimento"
                                    required
                                    type="Date"
                                    value={this.state.cliente.dataNascimento}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <LInput
                                    label="E-mail"
                                    name="cliente.email"
                                    required
                                    value={this.state.cliente.email}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridCpf">
                            <LInput
                                    label="Cpf"
                                    name="cliente.cpf"
                                    required
                                    value={this.state.cliente.cpf}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTelefone">
                                <LInput
                                      label="Telefone"
                                      name="cliente.telefone"
                                      required
                                      value={this.state.cliente.telefone}
                                      onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGriSenha">
                            <LInput
                                    label="Senha"
                                    name="cliente.senha"
                                    type="password"
                                    required
                                    value={this.state.cliente.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridConfSenha">
                            <LInput
                                    label="Confirmar senha"
                                    name="cliente.confirmarSenha"
                                    type="password"
                                    required
                                    value={this.state.cliente.confirmarSenha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group as={Col} md={5}>
                        <h4 className="mt-5" style={{ color: "#755721" }}>Endereços</h4>
                        </Form.Group>
                        <Row>
                        <h5 className="mt-3" style={{ color: "#755721" }}>Tipo de Endereço</h5>
                        <Form.Group as={Col} controlId="formGridTipoEndereco">
                            <LSelect                                 
                                    items={this.state.tipoEnderecos}
                                    name="cliente.enderecoCobranca.tipoEnderecoId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoEnderecoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridTipoLogradouro">
                            <LInput
                                    label="Tipo logradouro"
                                    name="cliente.enderecoCobranca.tipoLogradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTipoResidencia">
                            <LInput
                                    label="Tipo residência"
                                    name="cliente.enderecoCobranca.tipoResidencia"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridLogradouro">
                            <LInput
                                    label="Logradouro"
                                    name="cliente.enderecoCobranca.logradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridNumero">
                                <LInput
                                    label="Número"
                                    name="cliente.enderecoCobranca.numero"
                                    required
                                    value={this.state.cliente.enderecoCobranca.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridBairro">
                            <LInput
                                    label="Bairro"
                                    name="cliente.enderecoCobranca.bairro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCep">
                            <LInput
                                    label="Cep"
                                    name="cliente.enderecoCobranca.cep"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                /> 
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridCidade">
                            <LSelect
                                    label="Cidade"
                                    items={this.state.cidades}
                                    name="cliente.enderecoCobranca.cidadeId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cidadeId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                            <LSelect
                                    label="Estado"
                                    items={this.state.estados}
                                    name="cliente.enderecoCobranca.estadoId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.estadoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPais">
                            <LSelect
                                    label="Pais"
                                    items={this.state.paises}
                                    name="cliente.enderecoCobranca.paisId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.paisId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        {/* <Row className="mb-3"> */}
                        {/* <h5 className="mt-3" style={{ color: "#755721" }}>Tipo de Endereço</h5> */}
                        {/* <Form.Group as={Col} controlId="formGridTipoEnd">
                            <LSelect                                 
                                    items={this.state.tipoEnderecos}
                                    name="cliente.enderecoCobranca.tipoEnderecoId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoEnderecoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>          
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridTipoLogradouro">
                            <LInput
                                    label="Tipo logradouro"
                                    name="cliente.enderecoCobranca.tipoLogradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTipoResidencia">
                            <LInput
                                    label="Tipo residência"
                                    name="cliente.enderecoCobranca.tipoResidencia"
                                    required
                                    value={this.state.cliente.enderecoCobranca.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridLogradouro">
                            <LInput
                                    label="Logradouro"
                                    name="cliente.enderecoCobranca.logradouro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridNumero">
                                <LInput
                                    label="Número"
                                    name="cliente.enderecoCobranca.numero"
                                    required
                                    value={this.state.cliente.enderecoCobranca.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridBairro">
                            <LInput
                                    label="Bairro"
                                    name="cliente.enderecoCobranca.bairro"
                                    required
                                    value={this.state.cliente.enderecoCobranca.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCep">
                            <LInput
                                    label="Cep"
                                    name="cliente.enderecoCobranca.cep"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                /> 
                            </Form.Group>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group as={Col} controlId="formGridCidade">
                            <LSelect
                                    label="Cidade"
                                    items={this.state.cidades}
                                    name="cliente.enderecoCobranca.cidadeId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.cidadeId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEstado">
                            <LSelect
                                    label="Estado"
                                    items={this.state.estados}
                                    name="cliente.enderecoCobranca.estadoId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.estadoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPais">
                            <LSelect
                                    label="Pais"
                                    items={this.state.paises}
                                    name="cliente.enderecoCobranca.paisId"
                                    required
                                    value={this.state.cliente.enderecoCobranca.paisId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group> */}
                        {/* </Row> */}
                    {/* <hr /> */}
                            <h4 className="mt-5" style={{ color: "#755721" }}>Formas de Pagamento</h4>
                            <h5 className="mt-3" style={{ color: "#755721" }}>Cartão de crédito</h5>
                            <Row>
                            <Form.Group as={Col} controlId="formGridNumeroCartao">
                                <LInput
                                    label="Nº do Cartão"
                                    name="cliente.cartaoCredito.numeroCartao"
                                    required
                                    value={this.state.cliente.cartaoCredito.numeroCartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridNomeCartao">
                                <LInput
                                    label="Nome impresso do cartão"
                                    name="cliente.cartaoCredito.nomeCartao"
                                    required
                                    value={this.state.cliente.cartaoCredito.nomeCartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group as={Col} controlId="formGridBandeiraCartao">
                                <LSelect
                                    label="Bandeira"
                                    items={this.state.bandeiras}
                                    name="cliente.cartaoCredito.bandeiraCartaoId"
                                    required
                                    value={this.state.cliente.cartaoCredito.bandeiraCartaoId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCodigoCartao">
                                <LInput
                                    label="Código de segurança"
                                    name="cliente.cartaoCredito.codigoSeguranca"
                                    required
                                    value={this.state.cliente.cartaoCredito.codigoSeguranca}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                                </Row>                             
                     </LForm>
                    <hr /> 
                </Card.Body>
            </FormLayout>
        );
      }
    }



