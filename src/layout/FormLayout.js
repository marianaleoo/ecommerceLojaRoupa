import { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LNavbar from "../componentes/navbar/LNavbar";

export default class FormLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <LNavbar />
        <div style={{ backgroundColor: "#f1f1f1" }} className="pt-5">
          <Container
            className="pt-5"
            style={{ backgroundColor: "#f1f1f1", minHeight: "100vh" }}
          >
            <Row>
              <Col md={12}>
                <Card className="p-4 w-100" style={{ backgroundColor: "#ffffff", borderRadius: "0px" }}>
                  {children}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
