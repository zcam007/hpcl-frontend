import React from "react";
import { Form, Input, Row, Col } from "antd";

const CassetteAcComponent = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Item name="gas" label="Gas">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default CassetteAcComponent;
