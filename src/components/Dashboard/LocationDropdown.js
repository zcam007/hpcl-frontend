import { Select } from "antd";
import { Component } from "react";
import ProductAdminTable from "../FormComponents/ProductAdminTable";
import "../../config";
const { Option } = Select;

// console.log()
class LocationDropdown extends Component {
  onLocationChange(e) {
    this.setState({
      selectedLocation: e,
      validationError: e === "" ? "You must select your location" : "",
    });
    console.log(e);
    console.log(this.state.completeData.result[e]);
    this.state.selectedLocatonId = this.state.completeData.result[e]._id;
    if (e === "") {
      return true;
    }
    let categoriesFromApi = this.state.completeData.result[e].categories.map(
      (d) => {
        return { value: d._id, display: d.name };
      }
    );
    this.setState({
      categories: [{ value: "", display: "Select your Category" }].concat(
        categoriesFromApi
      ),
    });
  }
  onCategoryChange(e) {
    this.setState({
      selectedCategory: e,
      validationError: e === "" ? "You must select your category" : "",
    });
    // console.log(e);
    // console.log(this.state.completeData.result[e])
    this.state.selectedCategoryId = e;
  }

  state = {
    locations: [],
    categories: [],
    selectedLocation: "",
    selectedLocatonId: "",
    selectedCategory: "",
    selectedCategoryId: "",
    validationError: "",
    completeData: "",
    isLoading:true,
  };
  componentDidMount() {
    fetch(global.config.apiEndpoint + "/location/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ completeData: data });
        let i = 0;
        let locationsFromApi = data.result.map((d) => {
          return { value: i++, display: d.name };
        });
        if(data.result.length>0){
          this.setState({isLoading:false})
        }
        this.setState({
          locations: [{ value: "", display: "Select your Location" }].concat(
            locationsFromApi
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
          value={this.state.selectedLocation}
          style={{ width: 220 }}
          onChange={(e) => this.onLocationChange(e)}
          loading={this.state.isLoading}
        >
          {this.state.locations.map((location) => (
            <Option key={location.value} value={location.value}>
              {location.display}
            </Option>
          ))}
        </Select>
        {/* <div>selected id={this.state.selectedLocation}</div> */}
        <Select
          value={this.state.selectedCategory}
          style={{
            width: 220,
            display:
              this.state.selectedLocation === "" ? "none" : "inline-block",
          }}
          onChange={(e) => this.onCategoryChange(e)}
        >
          {this.state.categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.display}
            </Option>
          ))}
        </Select>

        <div style={{ color: "red", marginTop: "5px" }}>
          {this.state.validationError}
        </div>

        <ProductAdminTable
          type="product"
          privacy="user"
          loc_id={this.state.selectedLocatonId}
          cat_id={this.state.selectedCategoryId}
        />
      </div>
    );
  }
}

export default LocationDropdown;
