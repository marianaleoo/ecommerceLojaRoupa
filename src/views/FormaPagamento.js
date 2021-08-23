import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../layout/FormLayout";
import LForm from "../componentes/form/LForm";
import LInput from "../componentes/form/LInput";
import { updateStateValue } from "../util/util";
import LTable from "../componentes/table/LTable";


export default class FormaPagamento extends Component {
    constructor(props) {
        super(props);
        //this.state = {formaPagamento: {numerocartao: "", nomecartao: "", bandeiracartao: "", codigoSeguranca: ""}};
        this.state = {formaPagamento:{}}
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

    handleSelectedRow(row) {
        let selectedRow = (row);
    
        console.log(selectedRow);
        this.setState({
          formaPagamento: selectedRow,
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
        this.setState({formaPagamento: {...this.state.formaPagamento,  nomecartao: value}})
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
              dataField: "numerocartao",
              text: "Nº do Cartão",
              events: this.rowEvents,
            },
            {
              dataField: "nomecartao",
              text: "Nome impresso no Cartão",
              events: this.rowEvents,
            },
          ];
        const data= [
            {
                numerocartao: '4716 5601 0093 8307',
                nomecartao: 'Mariana Leo',
                bandeiraCartao: 'Visa',
                codigoSeguranca: '123'
             
            },
        ]
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Forma Pagamento
                    </Card.Title>
                    <hr />
                    <LTable data={data} columns={columns}></LTable>
                    <LForm  onSubmit={this.cadastroSucesso} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Cadastrar Cartão</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="Nº DO CARTÃO"
                                    name="formaPagamento.numerocartao"
                                    required
                                    value={this.state.formaPagamento.numerocartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME IMPRESSO NO CARTÃO"
                                    name="formaPagamento.nomecartao"
                                    required
                                    value={this.state.formaPagamento.nomecartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BANDEIRA"
                                    name="formaPagamento.bandeiraCartao"
                                    required
                                    value={this.state.formaPagamento.bandeiraCartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CÓDIGO DE SEGURANÇA"
                                    name="formaPagamento.codigoSeguranca"
                                    required
                                    value={this.state.formaPagamento.codigoSeguranca}
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


// Nº do Cartão, Nome impresso no Cartão, Bandeira do Cartão e Código de Segurança.