import { Row, Select } from "antd";
import React, { useState } from "react";
import LocationDropdown from "./LocationDropdown";
import EquipmentDropdown from "./SearchByEquipment";
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';

const { Option } = Select;


export default function Dashboard() {
const [selectedOption,setSelectedOption]=useState("");
function onChange(e){
setSelectedOption(e)
}
  return (
    <div>
    <div style={{height:'800px'}}>

      <Row style={{marginBottom:'40px'}}>
      <Select
          // value={selectedOption}
          placeholder="Please select an option"
          style={{ width: 220 }}
          onChange={(e) => onChange(e)}
        >
            <Option key="0" value="vialocaton">
              Search By Location
            </Option>
            <Option key="1" value="viaEquipment">
              Search By Equipment
            </Option>
        
        </Select>
        </Row>
     {selectedOption=="vialocaton"?<LocationDropdown />:""}   
     {selectedOption=="viaEquipment"?<EquipmentDropdown />:""}   
    
    </div>
    <Footer
    columns={[
      {
        icon: (
          <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
        ),
        title: 'Copyrighted data',
        url: 'https://hello.chandu.dev',
        description: '知识创作与分享工具',
        openExternal: true,
      },
    ]}
    bottom="Made with ❤️ by Chandu"
  />
</div>
  );
}
