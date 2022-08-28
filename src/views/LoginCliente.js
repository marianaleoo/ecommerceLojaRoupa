import { Component } from 'react';
import { Button, Card, Form} from 'react-bootstrap';
import FormLayout from '../layout/FormLayout';



export default class LoginCliente extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
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
                <Button href= "\CarrinhoCliente">Entrar</Button>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLabel">
                <Button href= "\CadastroClienteTeste">Cadastrar-se</Button>
                </Form.Group>
            </Form>
            </FormLayout> 
        );
    }
}
