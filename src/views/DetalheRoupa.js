import { Component } from 'react';
import { Button, ButtonGroup, CardGroup, Dropdown, DropdownButton, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import FormLayout from "../layout/FormLayout";

export default class DetalheRoupa extends Component {
  constructor(props) {
    super(props)
    this.state ={
    };
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
          <Card.Title
          >Shorts Saia</Card.Title>
          <Card.Title>
           R$59,90
          </Card.Title>
      <Card.Title style={{
        marginLeft: '7.3em'

      }} >
           Escolha seu tamanho
          </Card.Title>
       <ButtonGroup style={{
        margin: '1em'
      }}>
        <Button>PP</Button>
        <Button>P</Button>
        <Button>M</Button>
        <Button>G</Button>
        <Button>GG</Button>
       </ButtonGroup>
       <Dropdown style={{
            margin: '1em'
       }}>
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
    </Dropdown>
    <Button href="\LoginCliente" style={{
      margin: '1em'
    }}>
      Comprar
    </Button>
      </Card>
        </CardGroup>           
      </FormLayout> 
    )
}}
  

