import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import axios from "axios";
import "../../config";
var querystring = require("querystring");

const CollectionCreateForm = ({ visible, onCreate, onCancel, type }) => {
  const [form] = Form.useForm();
  // console.log(title)
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  const title = `Add new ${type}`;
  return (
    <Modal
      visible={visible}
      title={title}
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="locationName"
          label="Name"
          rules={[
            {
              required: true,
              message: `Please input the name of the ${type}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // extra="longgggggggggggggggggggggggggggggggggg"
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddLocation = (props) => {
  console.log(props);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    let urlObject = {
      name: values.locationName,
      description: values.description,
    };
    axios
      .post(
        `${global.config.apiEndpoint}/${props.type}/add`,
        querystring.stringify(urlObject),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    setVisible(false);
  };
  // const =props.type;

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add {props.type}
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        type={props.type}
      />
    </div>
  );
};

export default AddLocation;
