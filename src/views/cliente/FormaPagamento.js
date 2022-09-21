import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LInput from "../../componentes/form/LInput";
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable";
import { apiGet, apiPost } from "../../util/apiutil";
import LForm from "../../componentes/form/LForm";


export default class FormaPagamento extends Component {
    constructor(props) {
        super(props);
        this.state = {cartaoCredito:{numerocartao: "", nomecartao: "", bandeiracartao: "", codigoSeguranca: ""}, cartoesCredito:[]}
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

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        try {
            console.log(this.state.cartaoCredito)
            await apiPost("/CartaoCredito", this.state.cartaoCredito)
            window.location.href = "/HomeCadastroSucesso";

        } catch (error) {
            console.log(error);
        }

    }

    async componentDidMount() {
        await this.consultaCartaoCredito();
    }
    async consultaCartaoCredito() {
        try {
            let cartoesCredito = await apiGet ("/CartaoCredito");

            this.setState({
                cartoesCredito,
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleSelectedRow(row) {
        let selectedRow = (row);
    
        console.log(selectedRow);
        this.setState({
          cartaoCredito: selectedRow,
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
        this.setState({cartaoCredito: {...this.state.cartaoCredito,  nomecartao: value}})
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

        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                     Forma Pagamento
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.cartoesCredito} columns={columns}></LTable>
                    <LForm onSubmit={this.handleSubmit.bind(this)} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Cadastrar Cartão de Crédito</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="Nº DO CARTÃO"
                                    name="cartaoCredito.numerocartao"
                                    required
                                    value={this.state.cartaoCredito.numerocartao}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="NOME IMPRESSO NO CARTÃO"
                                    name="cartaoCredito.nomecartao"
                                    required
                                    value={this.state.cartaoCredito.nomecartao}
                                    onChange={this.AlteraNomeInput.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="BANDEIRA"
                                    name="cartaoCredito.bandeiraCartao"
                                    required
                                    value={this.state.cartaoCredito.bandeiraCartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="CÓDIGO DE SEGURANÇA"
                                    name="cartaoCredito.codigoSeguranca"
                                    required
                                    value={this.state.cartaoCredito.codigoSeguranca}
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


