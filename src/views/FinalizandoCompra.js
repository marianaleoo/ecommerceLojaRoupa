import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Col, Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import LInput from '../componentes/form/LInput';
import LSelect from '../componentes/form/LSelect';
// import { Accordion } from 'react-bootstrap';
import FormLayout from '../layout/FormLayout';
import { updateStateValue } from '../util/util';


export default class FinalizandoCompra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cliente: {
                enderecoCobranca: { tipoLogradouro: "Residência", tipoResidencia: "Casa", logradouro: "Rua Pedro Paulo dos Santos", numero: "3175", bairro: "Jundiapeba", cep: "08750-710", cidade: "Mogi das Cruzes", estado: "São Paulo", pais: "Brasil", tipoEndereco: "Entrega" }, cartaoCredito: { numerocartao: "7648 1452 8659 2415", nomecartao: "Mariana Oliveira", bandeiraCartao: "Mastercard", codigoSeguranca: "123" },
            },
        };
    }

    render() {
        return (
            <FormLayout>
                <Row>
                    <h4 style={{
                        color: "#755721"
                    }}>Confirme seus dados</h4>
                    <h5 className="mt-3" style={{ color: "#755721" }}>Tipo de Endereço</h5>
                    <Form.Group as={Col} controlId="formGridTipoEndereco">
                        <LInput
                            items={this.state.tipoEnderecos}
                            name="cliente.enderecoCobranca.tipoEndereco"
                            required
                            value={this.state.cliente.enderecoCobranca.tipoEndereco}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTipoLogradouro">
                        <LInput
                            label="Tipo logradouro"
                            name="cliente.enderecoCobranca.tipoLogradouro"
                            required
                            value={this.state.cliente.enderecoCobranca.tipoLogradouro}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridTipoResidencia">
                        <LInput
                            label="Tipo residência"
                            name="cliente.enderecoCobranca.tipoResidencia"
                            required
                            value={this.state.cliente.enderecoCobranca.tipoResidencia}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLogradouro">
                        <LInput
                            label="Logradouro"
                            name="cliente.enderecoCobranca.logradouro"
                            required
                            value={this.state.cliente.enderecoCobranca.logradouro}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNumero">
                        <LInput
                            label="Número"
                            name="cliente.enderecoCobranca.numero"
                            required
                            value={this.state.cliente.enderecoCobranca.numero}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridBairro">
                        <LInput
                            label="Bairro"
                            name="cliente.enderecoCobranca.bairro"
                            required
                            value={this.state.cliente.enderecoCobranca.bairro}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCep">
                        <LInput
                            label="Cep"
                            name="cliente.enderecoCobranca.cep"
                            required
                            value={this.state.cliente.enderecoCobranca.cep}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCidade">
                        <LInput
                            label="Cidade"
                            name="cliente.enderecoCobranca.cidade"
                            required
                            value={this.state.cliente.enderecoCobranca.cidade}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEstado">
                        <LInput
                            label="Estado"
                            name="cliente.enderecoCobranca.estado"
                            required
                            value={this.state.cliente.enderecoCobranca.estado}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPais">
                        <LInput
                            label="Pais"
                            name="cliente.enderecoCobranca.pais"
                            required
                            value={this.state.cliente.enderecoCobranca.pais}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <h4 className="mt-5" style={{ color: "#755721" }}>Formas de Pagamento</h4>
                <Button  style={{
                            color: "#755721" 
                        }}>
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                    Cadastrar novo cartão de crédito</Button>
                <h5 className="mt-3" style={{ color: "#755721" }}>Cartão de crédito cadastrado</h5>
                <Row>
                    <Form.Group as={Col} controlId="formGridNumeroCartao">
                        <LInput
                            label="Nº do Cartão"
                            name="cliente.cartaoCredito.numerocartao"
                            required
                            value={this.state.cliente.cartaoCredito.numerocartao}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNomeCartao">
                        <LInput
                            label="Nome impresso do cartão"
                            name="cliente.cartaoCredito.nomecartao"
                            required
                            value={this.state.cliente.cartaoCredito.nomecartao}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="formGridBandeiraCartao">
                        <LInput
                            label="Bandeira"
                            name="cliente.cartaoCredito.bandeiraCartao"
                            required
                            value={this.state.cliente.cartaoCredito.bandeiraCartao}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCodigoCartao">
                        <LInput
                            label="Código de segurança"
                            name="cliente.cartaoCredito.codigoSeguranca"
                            required
                            value={this.state.cliente.cartaoCredito.codigoSeguranca}
                        // onChange={this.handleInputChange.bind(this)}
                        />
                    </Form.Group>
                </Row>
                <br></br>
                <Button  style={{
                            color: "#755721" 
                        }}href="\HomeAtualizadoSucesso">
                    Atualizar dados
                </Button>
                <Button  style={{
                            color: "#755721" 
                        }}href="\HomeFinalizaCompra">
                    FinalizarCompra
                </Button>

            </FormLayout>

        );
    }
}