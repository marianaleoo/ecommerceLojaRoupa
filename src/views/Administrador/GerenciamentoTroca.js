import { Component } from "react";
import { Card, Col, Form, Button, ButtonGroup } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LForm from "../../componentes/form/LForm"
import LInput from "../../componentes/form/LInput"
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable"
import { apiDelete, apiGet, apiPut } from "../../util/apiultil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class GerenciamentoTroca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCompra: { id: "", status: "", compraId: "", roupaId: "", preco: "", cupomTrocaId: "", aceitarTroca: false, recusarTroca: false },
            comprasPedicoTroca: [],
            comprasTrocaAceita: [],
            comprasTrocaRecusada: [],
            comprasTrocaRecebida: [],
        }
    }

    async componentDidMount() {
        await this.consultaItemCompra();
    }

    async consultaItemCompra() {
        try {
            let comprasPedicoTroca = await apiGet("/ItemCompra/" + "PEDIDO_DE_TROCA")
            console.log(comprasPedicoTroca);
            let comprasTrocaAceita = await apiGet("/ItemCompra/" + "TROCA_ACEITA")
            console.log(comprasTrocaAceita);
            let comprasTrocaRecusada = await apiGet("/ItemCompra/" + "TROCA_RECUSADA")
            console.log(comprasTrocaRecusada);
            let comprasTrocaRecebida = await apiGet("/ItemCompra/" + "TROCA_RECEBIDA")
            console.log(comprasTrocaRecebida);
            this.setState({
                comprasPedicoTroca: comprasPedicoTroca,
                comprasTrocaAceita: comprasTrocaAceita,
                comprasTrocaRecusada: comprasTrocaRecusada,
                comprasTrocaRecebida: comprasTrocaRecebida
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
            let itemCompraAlterada = await apiPut("/ItemCompra/" + row.id)
            console.log(itemCompraAlterada);
            await this.consultaItemCompra();
        } catch (error) {
            console.log(error);
        }

    }

    async aceitarTroca(row) {
        try {
            console.log(row);
            row.aceitarTroca = true;
            let itemCompraAlterada = await apiPut("/ItemCompra/AceitarTroca/", row)
            console.log(itemCompraAlterada);
            await this.consultaItemCompra();
        } catch (error) {
            console.log(error);
        }

    }

    async recusarTroca(row) {
        try {
            console.log(row);
            row.recusarTroca = true;
            let itemCompraAlterada = await apiPut("/ItemCompra/RecusarTroca/" , row)
            console.log(itemCompraAlterada);
            await this.consultaItemCompra();
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
        const columnsPedidoTroca = [
            {
                dataField: "id",
                text: "Código do item da compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "preco",
                text: "Preço",
                events: this.rowEvents,
            },
            {
                text: "Aceitar Troca ",
                dataField: "Aceitar troca",
                formatter: (cell, row) => {
                    return <Button style={{ color: "#755721" }} onClick={() => {
                        this.aceitarTroca(row);
                    }}>Aceitar troca</Button>
                }
            },
            {
                text: "Recusar Troca ",
                dataField: "recusarTroca",
                formatter: (cell, row) => {
                    return <Button style={{ color: "#755721" }} onClick={() => {
                        this.recusarTroca(row);
                    }}>Recusar troca</Button>
                }
            },
        ];
        const columnsTrocaAceita = [
            {
                dataField: "id",
                text: "Código do item da compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "preco",
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
        const columnsTrocaRecusada = [
            {
                dataField: "id",
                text: "Código do item da compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "preco",
                text: "Preço",
                events: this.rowEvents,
            },
        ];
        const columnsTrocaRecebida = [
            {
                dataField: "id",
                text: "Código do item da compra",
                events: this.rowEvents,
            },
            {
                dataField: "status",
                text: "Status da compra",
                events: this.rowEvents,
            },
            {
                dataField: "preco",
                text: "Preço",
                events: this.rowEvents,
            },
        ];
        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras com status de troca PEDIDO DE TROCA:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasPedicoTroca} columns={columnsPedidoTroca}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras com status de troca TROCA ACEITA:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasTrocaAceita} columns={columnsTrocaAceita}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras com status de troca TROCA RECUSADA:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasTrocaRecusada} columns={columnsTrocaRecusada}>

                    </LTable>

                    <hr />
                </Card.Body>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras com status de troca TROCA RECEBIDA:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.comprasTrocaRecebida} columns={columnsTrocaRecebida}>

                    </LTable>

                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
