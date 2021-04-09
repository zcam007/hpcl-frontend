import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  InputNumber,
} from "antd";

const CompresserComponent = (props) => {
  return (
    <>
      <Row>
        {/*         
        <Col>
          <Form.Item
            name="hpm"
            label="HPM"
          >
            <InputNumber />
          </Form.Item>
        </Col> */}
<Col>
          <Form.Item name="gas" label="Gas">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="hp" label="HP">
            <Input />
          </Form.Item>
        </Col>

      </Row>
    </>
  );
};

export default CompresserComponent;
