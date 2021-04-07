import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Select,
} from "antd";
import axios from "axios";
import AddLocationsToCategory from "../FormComponents/LocationsAdd";
import "../../config";
var querystring = require("querystring");
const { Option } = Select;

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

const ProductAdminTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [columnss, setColumns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const isEditing = (record) => {
    return record.key === editingKey;
  };
  console.log(props);
  useEffect(() => {
    if (props.privacy == "user") {
      getLatestData(props.cat_id);
    } else {
      getCategories("category");
    }
  }, [props]);
  async function getCategories(key) {
    const response = await axios.get(`${global.config.apiEndpoint}/${key}/all`);
    let i = 0;
    let dataFromApi = response.data.result.map((d) => {
      return { key: i++, name: d.name, description: d.description, id: d._id };
    });
    if (key == "category") setCategories(dataFromApi);
  }
  function onCategoryChange(e) {
    setSelectedCategory(e);
    console.log("selected cate: " + e);
    // console.log(e)
    getLatestData(e);
  }
  async function getLatestData(selectedCat) {
    console.log("called");
    let response = "";
    if (selectedCat != "") {
      if (props.privacy == "user") {
        console.log("yeah");
        response = await axios.get(
          `${global.config.apiEndpoint}/${props.type}/bycatandloc/`,
          {
            params: {
              cat_id: props.cat_id,
              loc_id: props.loc_id,
            },
          }
        );
        console.log(response);
      } else {
        response = await axios.get(
          `${global.config.apiEndpoint}/${props.type}/bycatid/${selectedCat}`
        );
      }
      console.log(response);
      let i = 0;
      let dataFromApi = response.data.result.map((d) => {
        // console.log(Object.keys(d))
        // return {key: i++, make: d.make,model:d.model,id:d._id}
        return { key: i++, ...d };
      });
      setData(dataFromApi);

      let dynamicCol = [];
      if (dataFromApi.length > 0) {
        Object.keys(dataFromApi[0]).map((productKey) => {
          if (dataFromApi[0][productKey] == "") return true;
          if (
            productKey == "key" ||
            productKey == "_id" ||
            productKey == "location_id" ||
            productKey == "category_id" ||
            productKey == "created_at" ||
            productKey == "updated_at" ||
            productKey == "__v"
          )
            return true;
          let column = {
            title: productKey,
            dataIndex: productKey,
            width: "10%",
            editable: true,
            className: "mytable",
          };
          dynamicCol.push(column);
        });
      }
      dynamicCol = dynamicCol.concat([
        {
          title: "Operations",
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
      ]);
      // console.log(dynamicCol)
      // let customColumns=
      // console.log(dynamicCol)
      // setEditingKey('')
      // dynamicCol=dynamicCol.concat([{
      //     title: 'Operations',
      //     dataIndex: 'operation',
      //     render: (_, record) => {
      //       const editable = isEditing(record);
      //       console.log("ediatable "+editable)
      //       return editable ? (
      //         <span>
      //           <a
      //             href="javascript:;"
      //             onClick={() => save(record.key)}
      //             style={{
      //               marginRight: 8,
      //             }}
      //           >
      //             Save
      //           </a>
      //           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //             <a>Cancel</a>
      //           </Popconfirm>
      //         </span>
      //       ) : (
      //         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
      //           Edit
      //         </Typography.Link>
      //       );
      //     },
      //   },])
      //   console.log("hsddey")
      console.log(dynamicCol);
      setColumns(dynamicCol);
    }

    // console.log(columnss)
  }
  const edit = (record) => {
    form.setFieldsValue({
      //   name: '',
      //   description: '',
      ...record,
    });
    console.log(record.key + "in edit funcgtion");
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleleHandle = (record) => {
    console.log(record);
    //   console.log("del pressed"+props.id)
    // this.getLatestData();
    let url = `${global.config.apiEndpoint}/${props.type}/` + record._id;
    const response = axios.delete(url);
    console.log(selectedCategory);
    getLatestData(selectedCategory);
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

  //   const columnsss = [
  //     {
  //       title: `Model`,
  //       dataIndex: 'model',
  //       width: '10%',
  //       editable: true,
  //     },
  //     {
  //       title: 'Make',
  //       dataIndex: 'make',
  //       width: '10%',
  //       editable: true,
  //     },
  //     {
  //       title: 'Operations',
  //       dataIndex: 'operation',
  //       render: (_, record) => {
  //         const editable = isEditing(record);
  //         return editable ? (
  //           <span>
  //             <a
  //               href="javascript:;"
  //               onClick={() => save(record.key)}
  //               style={{
  //                 marginRight: 8,
  //               }}
  //             >
  //               Save
  //             </a>
  //             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //               <a>Cancel</a>
  //             </Popconfirm>
  //           </span>
  //         ) : (
  //           <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
  //             Edit
  //           </Typography.Link>
  //         );
  //       },
  //     },
  //     {
  //       title: 'Operations',
  //       dataIndex: 'operation',
  //       render: (_, record) =>
  //           data.length >= 1 ? (
  //             <Popconfirm title="Sure to delete?" onConfirm={() => deleleHandle(record)}>
  //               <a >Delete</a>
  //             </Popconfirm>
  //           ) : null,
  //     },

  //   ];

  //   if(props.type=="category"){
  //     columns.push({
  //       title: 'Operations',
  //       dataIndex: 'operation',
  //       render: (_, record) =>
  //           <AddLocationsToCategory record={record}/>
  //     })
  //   }

  // if(props.type=='product'){
  //     console.log(columnss)
  //     if(!columnss.includes({title: "Operations", dataIndex: "operation"}))
  //     columnss.push({
  //         title: 'Operations',
  //         dataIndex: 'operation',
  //         render: (_, record) => {
  //           const editable = isEditing(record);
  //           console.log("ediatable "+editable)
  //           return editable ? (
  //             <span>
  //               <a
  //                 href="javascript:;"
  //                 onClick={() => save(record.key)}
  //                 style={{
  //                   marginRight: 8,
  //                 }}
  //               >
  //                 Save
  //               </a>
  //               <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //                 <a>Cancel</a>
  //               </Popconfirm>
  //             </span>
  //           ) : (
  //             <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
  //               Edit
  //             </Typography.Link>
  //           );
  //         },
  //       })
  // }

  const mergedColumns = columnss.map((col) => {
    //   setColumns([])
    //   console.log(col)
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
  //   console.log(mergedColumns)
  return (
    <div>
      {/* {console.log(props.privacy)} */}
      {props.privacy != "user" ? (
        <Select
          value={selectedCategory}
          placeholder="Please select a location"
          style={{ width: 220 }}
          onChange={(e) => onCategoryChange(e)}
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      ) : (
        ""
      )}

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default ProductAdminTable;
