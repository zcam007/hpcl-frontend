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
import PumpComponent from "./PumpComponent";
import "../../config";
import axios from "axios";
import ChillerComponent from "./ProductComponents/ChillerComponent";
import CompresserComponent from "./ProductComponents/CompresserComponent";
import AhuComponent from "./ProductComponents/AhuComponent";
import CsuComponent from "./ProductComponents/CsuComponent";
import CassetteAcComponent from "./ProductComponents/CassetteAcComponent";
const { Option } = Select;

var querystring = require("querystring");

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    getLocations("location");
    getLocations("category");
  }, []);
  async function getLocations(key) {
    const response = await axios.get(`${global.config.apiEndpoint}/${key}/all`);
    let i = 0;
    let dataFromApi = response.data.result.map((d) => {
      // console.log(d)
      return { key: i++, name: d.name, description: d.description, id: d._id };
    });
    if (key === "location") setLocations(dataFromApi);
    if (key === "category") setCategories(dataFromApi);
  }
  //   const normFile = (e) => {
  //     console.log('Upload event:', e);

  //     if (Array.isArray(e)) {
  //       return e;
  //     }

  //     return e && e.fileList;
  //   };
  function onLocationChange(e) {
    // this.setState({selectedLocation: e,
    //   validationError: e === "" ? "You must select your location" : ""
    // })
    //   console.log(e)
    //   console.log(this.state.completeData.result[e])
    //   if(e==="") {return true};
    //   let categoriesFromApi=this.state.completeData.result[e].categories.map(d=>{
    //     return {value: d._id, display: d.name}
    //   })
    //   this.setState({
    //     categories: [{value: '', display: 'Select your Category'}].concat(categoriesFromApi)
    //   });
  }
  function onCategoryChange(index) {
    setSelectedCategory(index.children);
    //   console.log(index.children)
  }
  return (
    <Modal
      visible={visible}
      title="Add New Product"
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
        <Row justify="start">
          <Col span={12}>
            <Form.Item
              name="slnumber"
              label="SL Number"
              rules={[
                {
                  required: true,
                  message: "Please input the serial number of the product!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="make"
              label="Make"
              rules={[
                {
                  required: true,
                  message: "Please input the make of the product!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="start">
          <Col span={8}>
            <Form.Item
              name="model"
              label="Model"
              rules={[
                {
                  required: true,
                  message: "Please input the model of the product!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="type" label="Type">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="capacity" label="Capacity">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="start">
          <Col span={12}>
            <Form.Item
              name="voltage"
              label="Voltage"
              rules={[
                {
                  required: true,
                  message: "Please input the voltage of the product!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phase"
              label="Current"
              rules={[
                {
                  required: true,
                  message: "Please input the rpm of the product!",
                },
              ]}
            >
              {/* <Input /> */}
              <Select placeholder="Select a option" allowClear>
                <Option value="1Phase">1 Phase</Option>
                <Option value="3Phase">3 Phase</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              //   rules={[
              //     {
              //       required: true,
              //       message: 'Please select location of the product!',
              //     },
              //   ]}
            >
              <Select
                value={selectedLocation}
                placeholder="Please select a location"
                style={{ width: 220 }}
                onChange={(e) => onLocationChange(e)}
              >
                {locations.map((location) => (
                  <Option key={location.id} value={location.id}>
                    {location.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              //   rules={[
              //     {
              //       required: true,
              //       message: 'Please select location of the product!',
              //     },
              //   ]}
            >
              <Select
                value={selectedCategory}
                placeholder="Please select a category"
                style={{ width: 220 }}
                // onChange={e=>onCategoryChange(e)}
                onChange={(text, index) => {
                  onCategoryChange(index);
                }}
              >
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {selectedCategory.toLowerCase().includes("compresser") ? (
          <CompresserComponent />
        ) : (
          ""
        )}

        {selectedCategory.toLowerCase().includes("chiller") ? (
          <ChillerComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("pump") ? (
          <PumpComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("ahus") ? (
          <AhuComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("csus") ? (
          <CsuComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("cassette") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("ductable split") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("fcu ac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("flp ac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("hvac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("package") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("roof top") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("split ac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("vertical ac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("water cooler") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}
        {selectedCategory.toLowerCase().includes("window ac") ? (
          <CassetteAcComponent />
        ) : (
          ""
        )}

        {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button>Click to upload</Button>
        </Upload>
      </Form.Item> */}
      </Form>
    </Modal>
  );
};

const AddProduct = (props) => {
  console.log(props);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log(values);
    //   console.log(selectedCategory +" after submit")
    let urlObject = {
      slnumber: values.slnumber,
      make: values.make,
      model: values.model,
      phase: values.phase,
      rpm: values.rpm,
      voltage: values.voltage,
      category_id: values.category,
      location_id: values.location,
      type: values.type ? values.type : null,
      hp: values.hp ? values.hp : "",
      capacity: values.capacity ? values.capacity : "",
      gas: values.gas ? values.gas : "",
      vbeltnumber: values.vbeltnumber ? values.vbeltnumber : "",
      cfm: values.cfm ? values.cfm : "",
    };

    axios
      .post(
        `${global.config.apiEndpoint}/product/add`,
        querystring.stringify(urlObject),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        //   window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default AddProduct;
