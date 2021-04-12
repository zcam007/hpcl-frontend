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
    <div style={{height:'700px'}}>

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
     {selectedOption==="vialocaton"?<LocationDropdown />:""}   
     {selectedOption==="viaEquipment"?<EquipmentDropdown />:""}   
    
    </div>
    <Footer
    columns={[
      {
        icon: (
          <img alt="test" src="" />
        ),
        title: 'We own or license all copyright rights in the text, images, photographs, user interface, data and other content provided. The material contained in this website is distribured without profit for research and educational purposes. If you wish to use any copyrighted material from this site for purposes of your own, you must obtain expressed permission from the copyright owner.',
        url: 'https://hello.chandu.dev',
        description: 'Lorem ipsum',
        openExternal: true,
      },
    ]}
    bottom="Made with ❤️     by Chandu"
  />
</div>
  );
}
