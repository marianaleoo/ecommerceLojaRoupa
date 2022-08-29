import { CardGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LayoutRoupa from '../../layout/LayoutRoupa';

function GroupExample() {
  return (
    <LayoutRoupa>
      <CardGroup>
      <Card
      style={{
          width: '18rem',
         margin: '1em' }}>
      <Card.Img  variant="top" src="https://images.tcdn.com.br/img/img_prod/889236/shorts_saia_bella_2_0_xadrez_145_3_87a438241de0ce24a3af78d321233dfc.jpg" />
        <Card.Body>
          <Card.Title>Shorts Saia</Card.Title>
          <Card.Text>
           R$59,90
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button  style={{
                            color: "#755721" 
                        }} href="/DetalheRoupa">Comprar</Button>
        </Card.Footer>
      </Card>
      <Card style={{
          width: '18rem',
         margin: '1em' }}>
        <Card.Img variant="top" src="https://images.tcdn.com.br/img/img_prod/889236/calca_sarja_wide_cali_129_6_d11efcfa19bdee503c574dc9e06364c7.jpg" />
        <Card.Body>
          <Card.Title>Calça sarja wide</Card.Title>
          <Card.Text>
            R$120,00
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button  style={{
                            color: "#755721" 
                        }} href="/DetalheRoupa">Comprar</Button>
        </Card.Footer>
      </Card>
      <Card  style={{
          width: '18rem',
         margin: '1em' }}>
        <Card.Img variant="top" src="https://images.tcdn.com.br/img/img_prod/889236/shorts_isis_31_1_2d682b4aaba04cc72d828ebd806186d7.png" />
        <Card.Body>
          <Card.Title>Short</Card.Title>
          <Card.Text>
           R$40,00
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button style={{
                            color: "#755721" 
                        }} href="/DetalheRoupa">Comprar</Button>
        </Card.Footer>
      </Card>
    </CardGroup>
    </LayoutRoupa>
    
  );
}

export default GroupExample;
