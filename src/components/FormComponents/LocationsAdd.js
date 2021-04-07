import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";
import axios from "axios";
import { Checkbox } from "antd";
import "../../config";

const CollectionCreateForm = ({ visible, onCreate, onCancel, data }) => {
  const [form] = Form.useForm();
  const [plainOptions, setPlainOptions] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  function getAllLocations() {
    axios
      .get(`${global.config.apiEndpoint}/location/all`)
      .then(function (response) {
        let k = response.data.result.map((d) => {
          return { value: d._id, label: d.name };
        });
        setPlainOptions(k);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let checkedOptions = [];
  function getData(data) {
    axios
      .get(`${global.config.apiEndpoint}/category/${data.id}`)
      .then(function (response) {
        response.data.result.locations.map((d) => {
          checkedOptions.push(d._id);
        });
        setCheckedList(checkedOptions);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getData(data);
    getAllLocations();
  }, [data]);

  function onChangeBox(e, i) {
    // console.log(e.target.checked)
    if (e.target.checked) {
      axios
        .get(`${global.config.apiEndpoint}/category/addcattoloc/${i.value}`, {
          params: {
            cat_id: data.id,
          },
        })
        .then(function (response) {
          if (response.data.status !== 200) {
            alert("An error occured, Please see logs");
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(
          `${global.config.apiEndpoint}/category/deletecatfromloc/${i.value}`,
          {
            params: {
              cat_id: data.id,
            },
          }
        )
        .then(function (response) {
          if (response.data.status !== 200) {
            alert("An error occured, Please see logs");
            console.log(response);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Add New Location"
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
          {plainOptions.map((i, index) => (
            <Checkbox
              defaultChecked={checkedList.includes(i.value) ? true : ""}
              // checked={checkedList.includes(i.value) ? true : ""}
              onChange={(e) => onChangeBox(e, i)}
              value={i.value}
            >
              {i.label}
            </Checkbox>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

const AddLocationsToCategory = (props) => {
  //   console.log(props)
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    // console.log(values)
    setVisible(false);
  };

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
        data={props.record}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddLocationsToCategory;
