import { Component } from 'react';
import { Button, Card, Form} from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { apiPut } from '../../util/apiultil';



export default class LoginCliente extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario:{email: "", senha: ""}
        };
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(this.state)

        try {
            console.log(this.state.cliente)
            await apiPut("/Usuario/" + this.state.usuario.email, this.state.cliente.senha)
            window.location.href = "/";

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <FormLayout>
                <Card.Title>
                      Entre com sua conta
                </Card.Title>
                  <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="E-mail" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSenha">
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLabel">
                <Button  style={{
                            color: "#755721" 
                        }}href= "\CarrinhoCliente">Entrar</Button>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLabel">
                <Button style={{
                            color: "#755721" 
                        }}href= "\CadastroClienteTeste">Cadastrar-se</Button>
                </Form.Group>
            </Form>
            </FormLayout> 
        );
    }
}
