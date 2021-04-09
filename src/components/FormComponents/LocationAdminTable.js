import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import axios from "axios";
import AddLocationsToCategory from "./LocationsAdd";
import "../../config";
var querystring = require("querystring");

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const LocationAdminTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(true);
  const isEditing = (record) => record.key === editingKey;

  // console.log(props)
  useEffect(() => {
    getLatestData();
  }, []);
  async function getLatestData() {
    const response = await axios.get(
      `${global.config.apiEndpoint}/${props.type}/all`
    );
    if (response.data.result.length > 0) {
      console.log("length>0");
      setLoading(false);
    }
    let i = 0;
    let dataFromApi = response.data.result.map((d) => {
      // console.log(d)
      return { key: i++, name: d.name, description: d.description, id: d._id };
    });
    setData(dataFromApi);
    // console.log(dataFromApi)
  }
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      description: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleleHandle = (record) => {
    //   console.log("del pressed"+props.id)
    // this.getLatestData();
    let url = `${global.config.apiEndpoint}/${props.type}/` + record.id;
    const response = axios.delete(url);
    // console.log(response.data)
    // this.state
    getLatestData();
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      let urlObject = {
        name: row.name,
        description: row.description,
      };
      console.log(urlObject);
      let url = `${global.config.apiEndpoint}/${props.type}/` + data[key].id;
      axios
        .put(url, querystring.stringify(urlObject), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(function (response) {
          console.log(response);
          getLatestData();
          setEditingKey("");
        });
      console.log(key);
      console.log(row);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: `${props.type} Name`,
      dataIndex: "name",
      width: "25%",
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
      editable: true,
    },
    {
      title: "Operations",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleleHandle(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  if (props.type == "category") {
    columns.push({
      title: "",
      dataIndex: "operation",
      render: (_, record) => <AddLocationsToCategory record={record} />,
    });
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={loading}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default LocationAdminTable;
