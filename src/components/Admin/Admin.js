import React from "react";
import { Tabs } from "antd";
// import LocationAdminTable from '../FormComponents/LocationAdminTable'
import LocationAdminTable from "../FormComponents/LocationAdminTable";
import AddLocation from "../FormComponents/AddLocationBtn";
import AddProduct from "../FormComponents/AddProduct";
import ProductAdminTable from "../FormComponents/ProductAdminTable";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
export default function Admin() {
  return (
    <div>
      <h3>This is admin side of the portal</h3>
      <Tabs defaultActiveKey="1" centered onChange={callback}>
        <TabPane tab="Location" key="1">
          <AddLocation type="location" />

          {/* <LocationAdminTable/> */}
          <LocationAdminTable type="location" />
        </TabPane>
        <TabPane tab="Category" key="2">
          <AddLocation type="category" />
          <LocationAdminTable type="category" />
        </TabPane>
        <TabPane tab="Products" key="3">
          <AddProduct type="product" />
          <ProductAdminTable type="product" />
        </TabPane>
      </Tabs>
    </div>
  );
}
