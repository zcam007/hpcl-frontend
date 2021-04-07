import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";

const PumpComponent = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Form.Item
            name="type"
            label="Type"
            //   rules={[
            //     {
            //       required: true,
            //       message: 'Please input the serial number of the product!',
            //     },
            //   ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="hpm"
            label="HPM"
            //   rules={[
            //     {
            //       required: true,
            //       message: 'Please input the serial number of the product!',
            //     },
            //   ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="kwhp"
            label="KW/HP"
            //   rules={[
            //     {
            //       required: true,
            //       message: 'Please input the serial number of the product!',
            //     },
            //   ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="capacity"
            label="Capacity"
            //   rules={[
            //     {
            //       required: true,
            //       message: 'Please input the serial number of the product!',
            //     },
            //   ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default PumpComponent;
