import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import FormLayout from "../../layout/FormLayout";
import { apiGet } from '../../util/apiutil';

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state = { itemCarrinho: {id: "", quantidade: "", roupaId: ""},
    itensCarrinho: []
    };
}

async componentDidMount() {
  await this.consultaItemCarrinho();
}

async consultaItemCarrinho() {
  try {
    let itensCarrinho = await apiGet("/ItemCarrinho");
    console.log(itensCarrinho);

    this.setState({
      itensCarrinho,
    });
  } catch (error) {
    console.log(error);
  }
}

render(){
    return(
      <FormLayout>
        <CardGroup>
        <Card
      style={{
          width: '18rem',
         margin: '1em' }}>
      <Card.Img variant="top" src="https://images.tcdn.com.br/img/img_prod/889236/shorts_saia_bella_2_0_xadrez_145_3_87a438241de0ce24a3af78d321233dfc.jpg" />
        {/* <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer> */}
      </Card>   
      <Card
        style={{
          width: '18rem',
         margin: '1em' }}>
          <Card.Title style={{
                            color: "#755721" 
                        }}
          >Shorts Saia</Card.Title>
          <Card.Title style={{
                            color: "#755721" 
                        }}>
           R$59,90
          </Card.Title>
      <Card.Title style={{
        color: "#755721" ,
        margin: '1em'

      }} >
           Escolha seu tamanho
          </Card.Title>
       <ButtonGroup style={{
        margin: '1em'
      }}>
        <Button style={{
                            color: "#755721" 
                        }}>PP</Button>
        <Button style={{
                            color: "#755721" 
                        }}>P</Button>
        <Button style={{
                            color: "#755721" 
                        }}>M</Button>
        <Button style={{
                            color: "#755721" 
                        }}>G</Button>
        <Button style={{
                            color: "#755721" 
                        }}>GG</Button>
       </ButtonGroup>
       <Dropdown style={{
            margin: '1em'
       }}>
           <Card.Title style={{
        color: "#755721" ,

      }} >
           Quantidade
          </Card.Title>
      <DropdownButton> 
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
    </Dropdown>
    <Button href="\LoginCliente" style={{
      margin: '1em',
      color: '#755721'

    }}>
        <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
      Comprar
    </Button>
    <Button style={{
      margin: '1em',
      color: '#755721'

    }}>
        <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
      Remover do carrinho
    </Button>
      </Card>
        </CardGroup>           
      </FormLayout> 
    )
}}
  

