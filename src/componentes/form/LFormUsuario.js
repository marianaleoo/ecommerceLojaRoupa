import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";

export default class LForm extends Component {
  async handlePreventDefaut(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { children, onDelete, ...rest } = this.props;

    return (
      <Form
        noValidate
        onSubmit={this.props?.onSubmit || this.handlePreventDefaut}
        validated={this.props.hasError}
        {...rest}
      >
        {children}
        <Form.Row>
          <Col md={3}>
            <Button
              type="submit"
              variant="primary"
              block
              disabled={this.props?.disabled}
              onClick={this.props?.onClick}
            >
              {/* <FontAwesomeIcon
                icon={this.props?.customSubmitIcon || faCompactDisc}
                spin
                className="mr-2"
              /> */}
              {this.props?.customSubmitText || "Entrar"}
            </Button>
          </Col>
          {/* )} */}
        </Form.Row>
      </Form>
    );
  }
}
