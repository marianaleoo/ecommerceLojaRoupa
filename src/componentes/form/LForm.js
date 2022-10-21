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
  
              {this.props?.customSubmitText || "Salvar"}
            </Button>
          </Col>
          <Col md={3}>
            <Button
              variant="primary"
              block
              disabled={this.props?.disabled}
              onClick={this.props?.onCancel || this.handlePreventDefaut}
            >
              {/* <FontAwesomeIcon
                className="mr-2"
                icon={this.props?.customCancelcon || faStopCircle}
              /> */}
               {this.props?.customCancelText || "Cancelar"}
            </Button>
          </Col>
          {/* {this.props.allowDelete && ( */}
            <Col md={3}>
              <Button
                variant="primary"
                block
                disabled={this.props?.disabled}
                onClick={this.props?.onDelete || this.handlePreventDefaut}
              >
                {/* <FontAwesomeIcon className="mr-2" icon={faTrashAlt} /> */}
                {this.props?.customDeleteText || "Excluir"}
              </Button>
            </Col>
          {/* )} */}
        </Form.Row>
      </Form>
    );
  }
}
