import { Component } from 'react';
import { Button, Card, Col, Form} from 'react-bootstrap';
import LFormUsuario from '../../componentes/form/LFormUsuario';
import LInput from '../../componentes/form/LInput';
import FormLayout from '../../layout/FormLayout';
import { apiGet, apiPut } from '../../util/apiultil';
import { updateStateValue } from "../../util/util";



export default class LoginCliente extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cliente:{usuario:{email: "", senha: ""}}
        };
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state)

        try {
           var response = await apiGet("/Cliente/" +  this.state.cliente.usuario.email + "/" + this.state.cliente.usuario.senha)
           console.log(response);
           localStorage.clear();
           localStorage.setItem('clienteId', response[0].id);
           window.location.href= "/";

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

    render() {
        return (
            <FormLayout>
               
                <LFormUsuario onSubmit={this.handleSubmit.bind(this)} customSubmitText='Entrar'>     
                <Form.Group as={Col} md={12}>
                                <LInput
                                    label="E-MAIL"
                                    name="cliente.usuario.email"
                                    required
                                    value={this.state.cliente.usuario.email}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md={12}>
                                <LInput
                                    label="SENHA"
                                    name="cliente.usuario.senha"
                                    type="password"
                                    required
                                    value={this.state.cliente.usuario.senha}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </Form.Group>
                   </LFormUsuario>
            </FormLayout> 
        );
    }
}
