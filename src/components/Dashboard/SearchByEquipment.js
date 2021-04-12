import { Select } from "antd";
import { Component } from "react";
import ProductAdminTable from "../FormComponents/ProductAdminTable";
import "../../config";
const { Option } = Select;

// console.log()
class EquipmentDropdown extends Component {
  onCategoryChange(e) {
    this.setState({
        selectedCategory: e,
      validationError: e === "" ? "You must select your category" : "",
    });
    this.state.selectedCategoryId = this.state.completeData.result[e]._id;
    if (e === "") {
      return true;
    }
  }
  

  state = {
    categories: [],
    selectedCategory: "",
    selectedCategoryId: "",
    validationError: "",
    completeData: "",
    loadingState:true,
  };
  componentDidMount() {
    fetch(global.config.apiEndpoint + "/category/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ completeData: data });
        let i = 0;
        let categoriesFromApi = data.result.map((d) => {
          return { value: i++, display: d.name };
        });
        if(data.result.length > 0){
          this.setState({loadingState:false})
        }
        this.setState({
            categories: [{ value: "", display: "Select your Equipment" }].concat(
            categoriesFromApi
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Select
          value={this.state.selectedCategory}
          style={{ width: 220 }}
          onChange={(e) => this.onCategoryChange(e)}
          loading={this.state.loadingState}
        >
          {this.state.categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.display}
              
            </Option>
          ))}
        </Select>
        {/* <div>selected id={this.state.selectedLocation}</div> */}
        

        <div style={{ color: "red", marginTop: "5px" }}>
          {this.state.validationError}
        </div>

        <ProductAdminTable
          type="product"
          privacy="user"
          searchByEqp={true}
        //   loc_id={this.state.selectedLocatonId}
          cat_id={this.state.selectedCategoryId}
        />
      </div>
    );
  }
}

export default EquipmentDropdown;
