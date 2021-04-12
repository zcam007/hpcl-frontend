import React from "react";
import { Form, Input, Row, Col, InputNumber } from "antd";

const PumpComponent = (props) => {
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
          <Form.Item name="hp" label="HP">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
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

export default PumpComponent;
