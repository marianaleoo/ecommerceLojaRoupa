import React, { Component } from "react";
import Form from "react-bootstrap/Form";
  export default class ESelect  extends Component {
    render() {
      return (
        <Form.Group>
          {this.props.label && (
            <Form.Label {...this.props}>
              {this.props.required ? `${this.props.label} *` : this.props.label}
            </Form.Label>
          )}
          <Form.Control disabled as="select" className="form-control-sm" onChange={this.props.onChange} name={this.props.name}>
          {/* <option value="">{this.props.placeholder}</option> */}
            {this.props.items.length &&
              this.props.items.map((item) => (   
                <option key={item.id} value={item.id}>
                  {item.descricao}
                </option>
              ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            campo obrigatório
          </Form.Control.Feedback>
          {this.props.debug && `Value: ${this.props.value}`}
        </Form.Group>
      );
    }
  }