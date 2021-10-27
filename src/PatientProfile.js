import React from "react";
import { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import { useParams } from "react-router-dom";
import { TabPanel } from "./tabpanel";
import { PatientPersonalInformation } from "./patientPersonalInformation";
import { PatientMedicalInformation } from "./patientMedicalInformation";
import { PatientLifestyle } from "./patientLifestyle";
import { MainNav } from "./mainComponent/mainNav";
import { MainWrapper } from "./mainComponent/mainWrapper";

export default function PatientProfile() {
  const { registerId } = useParams();
  console.log(registerId)

  //for using tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainWrapper>
      <MainNav>Patient Information</MainNav>
      <div className="box_form">
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Personal" />
            <Tab label="Medical " />
            <Tab label="Lifestyle" />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <PatientPersonalInformation registerId={registerId} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <PatientMedicalInformation registerId={registerId} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <PatientLifestyle registerId={registerId} />
        </TabPanel>
      </div>
    </MainWrapper>
  );
}
