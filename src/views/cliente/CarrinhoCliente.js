import { Component } from 'react';
import { Button, ButtonGroup, Card, CardGroup, Dropdown, DropdownButton, Form, FormGroup } from 'react-bootstrap';
import FormLayout from '../../layout/FormLayout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



export default class CarrinhoCliente extends Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <FormLayout>
                        <Card.Title style={{
                            color: "#755721" 
                        }}>
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                        
                            Carrinho de Compra</Card.Title>
                        <CardGroup>
                        <Card
                    // style={{
                    //     width: '18rem',
                    //     height: '10rem',
                    //     margin: '1em'
                    // }}
                    >
                    <Card.Img  src="https://images.tcdn.com.br/img/img_prod/889236/shorts_saia_bella_2_0_xadrez_145_3_87a438241de0ce24a3af78d321233dfc.jpg" 
                        style={{
                            width: '18rem',
                            height: '10rem',
                            margin: '1em'
                        }}/>

                    </Card>            
                    <Card>
                      <Card.Title style={{
                            color: "#755721" 
                        }}>
                        Shorts Saia
                      </Card.Title>
                      <Card.Title style={{
                            color: "#755721" 
                        }}>
           R$59,90
          </Card.Title>
      <Card.Title style={{
                            color: "#755721" 
                        }} >
           Tamanho:
          </Card.Title>
       <ButtonGroup>
         <Button style={{
        color: "#755721" 

      }}>P</Button>
       </ButtonGroup>
       <br></br>
       <Card.Title style={{
                            color: "#755721" 
                        }}>Quantidade: 1</Card.Title>
       {/* <Dropdown>
       <DropdownButton id="dropdown-basic-button" title="Quantidade">
        <Dropdown.Item href="#/action-1">1</Dropdown.Item>
        <Dropdown.Item href="#/action-2">2</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3</Dropdown.Item>
        <Dropdown.Item href="#/action-3">4</Dropdown.Item>
        <Dropdown.Item href="#/action-3">5</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6</Dropdown.Item>
        <Dropdown.Item href="#/action-3">7</Dropdown.Item>
        <Dropdown.Item href="#/action-3">8</Dropdown.Item>
        <Dropdown.Item href="#/action-3">9</Dropdown.Item>
        <Dropdown.Item href="#/action-3">10</Dropdown.Item>
        </DropdownButton>
    </Dropdown> */}
    <Button  href="\FinalizandoCompra" style={{
        color: "#755721" 

      }} >
      Continuar 
    </Button>
                    </Card>            
                    </CardGroup>       
            </FormLayout>
        )
    }
}
