import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, InputNumber } from "antd";

const AhuComponent = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Item name="vbeltnumber" label="'V' belt No.">
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="hp" label="HP">
            <Input />
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
      </Row>
    </>
  );
};

export default AhuComponent;
