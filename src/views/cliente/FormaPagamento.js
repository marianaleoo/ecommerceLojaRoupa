import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LForm from "../../componentes/form/LForm";
import LInput from "../../componentes/form/LInput";
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable";
import { apiDelete, apiGet, apiPost } from "../../util/apiutil";
import LSelect from "../../componentes/form/LSelect";

export default class FormaPagamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: {
                cartaoCredito: {nomecartao: "", numerocartao: "", validadeCartao: "",  bandeiraId: "", bandeira:{}, codigoSeguranca: "" },
            },
        bandeiras:[]
       }
        
    }

    async componentDidMount() {
            await this.consultaBandeira();
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

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();


        try {
            var clienteId = localStorage.getItem('clienteId');
            this.state.cliente.cartaoCredito.clienteId = clienteId;
            await apiPost("/CartaoCredito", this.state.cliente.cartaoCredito)
         
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
        window.location.href = "/";
    }

    async excluir(event) {
        event.preventDefault();
        event.stopPropagation();
    
        try {
           console.log(this.state.cliente)
           await apiDelete("/CartaoCredito", this.state.cartaoCredito)     
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
                     Novoa forma de pagamento
                    </Card.Title>
                    <hr />
                    <LForm  onSubmit={this.handleSubmit.bind(this)} onCancel={this.sair} onDelete={this.excluir} customDeleteText='Excluir'>
                        <Form.Row>
                            <h4 className="mt-5" style={{ color: "#755721" }}>Forma de Pagamento</h4>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="Nome impresso do cartão"
                                    name="cliente.cartaoCredito.nomecartao"
                                    required
                                    value={this.state.cliente.cartaoCredito.nomecartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="Nº do Cartão"
                                    name="cliente.cartaoCredito.numerocartao"
                                    required
                                    value={this.state.cliente.cartaoCredito.numerocartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridValidadeCartao">
                                <LInput
                                    label="Nome impresso do cartão"
                                    name="cliente.cartaoCredito.validadeCartao"
                                    error={this.state.error}
                                    required
                                    value={this.state.cliente.cartaoCredito.validadeCartao}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                            <LSelect
                                    label="Bandeira"
                                    items={this.state.bandeiras}
                                    name="cliente.cartaoCredito.bandeiraId"
                                    required
                                    value={this.state.cliente.cartaoCredito.bandeiraId}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="Código de Segurança"
                                    name="cliente.cartaoCredito.codigoSeguranca"
                                    required
                                    value={this.state.cliente.cartaoCredito.codigoSeguranca}
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
