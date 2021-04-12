import React from "react";
import { Form, Input, Row, Col, InputNumber } from "antd";

const CsuComponent = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Item name="cfm" label="CFM">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="rpm"
            label="RPM"
            rules={[
              {
                required: true,
                message: "Please input the rpm of the product!",
              },
            ]}
          >
            <InputNumber />
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

export default CsuComponent;
