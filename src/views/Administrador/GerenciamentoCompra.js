import { Component } from "react";
import { Card, Col, Form, Button, ButtonGroup } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LForm from "../../componentes/form/LForm"
import LInput from "../../componentes/form/LInput"
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable"
import { apiDelete, apiGet, apiPut } from "../../util/apiultil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class GerenciamentoCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compra: { id: "", status: "", enderecoEntregaId: "", cupomTrocaId: "", cartaoCreditoId: "", cartaoCreditoId: "", clienteId: "", itensCompra: [] },
            compras: [],
            comprasEmProcessamento: [],
            comprasPagamentoRealizado: [],
            comprasEmTransporte: [],
            comprasEntregue: [],
        }
    }

    async componentDidMount() {
        await this.consultaCompra();
    }

    async consultaCompra() {
        try {
            let comprasEmProcessamento = await apiGet("/Compra/" + "EM_PROCESSAMENTO")
            let comprasPagamentoRealizado = await apiGet("/Compra/" + "PAGAMENTO_REALIZADO")
            let comprasEmTransporte = await apiGet("/Compra/" + "EM_TRANSPORTE")
            let comprasEntrega = await apiGet("/Compra/" + "ENTREGUE")
            this.setState({
                comprasEmProcessamento: comprasEmProcessamento,
                comprasPagamentoRealizado: comprasPagamentoRealizado,
                comprasEmTransporte: comprasEmTransporte,
                comprasEntregue: comprasEntrega
            });
        } catch (error) {
            console.log(error);
        }
    }

    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    async alterarStatus(row) {
        try {
            console.log(row.id);
            let compraalterada = await apiPut("/Compra/" + row.id)
            console.log(compraalterada);
            await this.consultaCompra();
        } catch (error) {
            console.log(error);
        }

    }


    rowEvents = {
        onClick: (e, column, columnIndex, row, rowIndex) => {
            this.handleSelectedRow(row);
        },
    };

    render() {
        const columnsEmProcessamento = [
            {
                dataField: "id",
                text: "Código Compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "itensCompra[0].preco",
                text: "Preço",
                events: this.rowEvents,
            },
            {
                text: "Avançar Status",
                dataField: "Avançar status da compra",
                formatter: (cell, row) => {
                    return <Button style={{ color: "#755721" }} onClick={() => {
                        this.alterarStatus(row);
                    }}>Avançar status da compra</Button>
                }
            },
        ];
        const columnsPagamentoRealizado = [
            {
                dataField: "id",
                text: "Código Compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "itensCompra[0].preco",
                text: "Preço",
                events: this.rowEvents,
            },
            {
                text: "Avançar Status",
                dataField: "Avançar status da compra",
                formatter: (cell, row) => {
                    return <Button style={{ color: "#755721" }} onClick={() => {
                        this.alterarStatus(row);
                    }}>Avançar status da compra</Button>
                }
            },
        ];
        const columnsEmTransporte = [
            {
                dataField: "id",
                text: "Código Compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "itensCompra[0].preco",
                text: "Preço",
                events: this.rowEvents,
            },
            {
                text: "Avançar Status",
                dataField: "Avançar status da compra",
                formatter: (cell, row) => {
                    return <Button style={{ color: "#755721" }} onClick={() => {
                        this.alterarStatus(row);
                    }}>Avançar status da compra</Button>
                }
            },
        ];
        const columnsEntregue = [
            {
                dataField: "id",
                text: "Código Compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "itensCompra[0].preco",
                text: "Preço",
                events: this.rowEvents,
            },
        ];
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras realizadas com status EM PROCESSAMENTO:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasEmProcessamento} columns={columnsEmProcessamento}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras realizadas com status PAGAMENTO REALIZADO:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasPagamentoRealizado} columns={columnsPagamentoRealizado}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras realizadas com status EM TRANSPORTE:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasEmTransporte} columns={columnsEmTransporte}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras realizadas com status ENTREGUE:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasEntregue} columns={columnsEntregue}>

                    </LTable>

                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
