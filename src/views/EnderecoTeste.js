import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import LTable from "../componentes/table/LTable";
import { apiDelete, apiGet } from "../util/apiutil";

export default class EnderecoTeste extends Component {
    constructor(props) {
        super(props);
            this.state = {enderecoCobranca:{cidade:{estado:{pais:{}}}}, enderecoCobrancas:[], cidades:[], estados:[], paises:[]}
    }

    async componentDidMount() {
        await this.consultaenderecoCobrancas();
    }
      async consultaenderecoCobrancas() {
        try {
          let enderecoCobrancas = await apiGet("/Endereco");
          console.log(enderecoCobrancas);
    
          this.setState({
            enderecoCobrancas,
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
          enderecoCobranca: selectedRow,
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
           console.log(this.state.enderecoCobranca)
           await apiDelete("/Endereco", this.state.enderecoCobranca)     
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
        this.setState({enderecoCobranca: {...this.state.enderecoCobranca,  nome: value}})
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
              dataField: "cep",
              text: "Cep",
              events: this.rowEvents,
            },
            {
              dataField: "cidade.descricao",
              text: "Cidade",
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
                    <LTable data={this.state.enderecoCobrancas} columns={columns}></LTable>
                    <LForm  onSubmit={this.alteraSucesso} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Endereço de entrega</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO LOGRADOURO"
                                    name="enderecoCobranca.tipoLogradouro"
                                    required
                                    value={this.state.enderecoCobranca.tipoLogradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="TIPO RESIDÊNCIA"
                                    name="enderecoCobranca.tipoResidencia"
                                    required
                                    value={this.state.enderecoCobranca.tipoResidencia}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                             <Form.Group as={Col} md={12}>
                                <LInput
                                    label="LOGRADOURO"
                                    name="enderecoCobranca.logradouro"
                                    required
                                    value={this.state.enderecoCobranca.logradouro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NUMERO"
                                    name="enderecoCobranca.numero"
                                    required
                                    value={this.state.enderecoCobranca.numero}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BAIRRO"
                                    name="enderecoCobranca.bairro"
                                    required
                                    value={this.state.enderecoCobranca.bairro}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CEP"
                                    name="enderecoCobranca.cep"
                                    required
                                    value={this.state.enderecoCobranca.cep}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CIDADE"
                                    name="enderecoCobranca.cidade.descricao"
                                    required
                                    value={this.state?.enderecoCobranca?.cidade.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                             <Form.Group as={Col} md={12}>
                                <LInput
                                    label="ESTADO"
                                    name="enderecoCobranca.cidade.estado.descricao"
                                    required
                                    value={this.state?.enderecoCobranca?.cidade.estado.descricao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                             <Form.Group as={Col} md={12}>
                                 <LInput
                                    label="PAIS"
                                    name="enderecoCobranca.cidade.estado.pais.descricao"
                                    required
                                    value={this.state?.enderecoCobranca?.cidade.estado.pais.descricao}
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
