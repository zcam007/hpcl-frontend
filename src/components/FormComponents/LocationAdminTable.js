import React from "react";
import { Table, Input, Button, Space, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../config";
class LocationAdminTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: "",
  };

  async getLatestData() {
    const response = await axios.get(
      `${global.config.apiEndpoint}/location/all`
    );
    // console.log(response.data)
    // this.state
    let i = 0;
    let dataFromApi = response.data.result.map((d) => {
      console.log(d);
      return { key: i++, name: d.name, description: d.description, id: d._id };
    });
    this.setState({
      data: dataFromApi,
    });
    console.log(dataFromApi);
  }
  componentDidMount() {
    this.getLatestData();
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  del = (props) => {
    //   console.log("del pressed"+props.id)
    this.getLatestData();
    let url = `${global.config.apiEndpoint}/location/` + props.id;
    const response = axios.delete(url);
    console.log(response.data);
    // this.state
    this.getLatestData();
  };
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Location Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      //   {
      //     title: 'Age',
      //     dataIndex: 'age',
      //     key: 'age',
      //     width: '20%',
      //     ...this.getColumnSearchProps('age'),
      //   },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        // render: (record) => <a onClick={()=>this.del(record)}>Delete</a>,
        render: (_, record) =>
          this.state.data.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.del(record)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

export default LocationAdminTable;
