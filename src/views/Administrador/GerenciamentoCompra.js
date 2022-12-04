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
            compras: []
        }
    }

    async componentDidMount() {
        await this.consultaCompra();
    }
    async consultaCompra() {
        try {
            let compras = await apiGet("/Compra");
            console.log(compras);

            this.setState({
                compras,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async avancarStatus(){
        try {
            
        } catch (error) {
            
        }
    }

    async handlePreventDefaut(event) {
        event.preventDefault();
        event.stopPropagation();
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
                events: {onClick : () => {
                   this.avancarStatus();
                  }},
                dataField: "Avançar status da compra"
            },
        ];


        return (
            <FormLayout>
                <Card.Body>
                    <Card.Title style={{ color: "#755721" }} as="h1">
                        Compras realizadas:
                        {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.compras} columns={columns}>
                        
                    </LTable>
                    
                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
