import { Component } from "react";
import { Card, Col, Form } from "react-bootstrap";
import FormLayout from "../../layout/FormLayout";
import LForm from "../../componentes/form/LForm"
import LInput from "../../componentes/form/LInput"
import { updateStateValue } from "../../util/util";
import LTable from "../../componentes/table/LTable"
import { apiDelete, apiGet, apiPut } from "../../util/apiultil"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class ConsultaClienteAdmin extends Component {
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
                    Lista de clientes cadastrados no sistema
                    {/* <FontAwesomeIcon icon={faSearchengin} className="mr-2" /> */}
                    </Card.Title>
                    <hr />
                    <LTable data={this.state.clientes} columns={columns}></LTable>
                    <hr />
                </Card.Body>
            </FormLayout>
        );
    }
}
