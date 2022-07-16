import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { PatientPersonalInformation } from "../patient/patientPersonalInformation";
import { PatientMedicalInformation } from "../patient/patientMedicalInformation";
import { PatientLifestyle } from "../patient/patientLifestyle";
import { MainNav } from "../mainComponent/mainNav";
import { MainWrapper } from "../mainComponent/mainWrapper";
import { MainTabs } from "../mainComponent/mainTabs";

export default function PatientProfile() {
  const { patientId } = useParams();
  //for using tab
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goToMedical=()=>{ 
    setValue(1)
  }
  const goToLifestyle=()=>{ 
    setValue(2)
  }

  return (
    <MainWrapper>
      <MainNav>Patient Information</MainNav>

      <div className="box_form">
        <MainTabs
          value={value}
          onChange={handleChange}
          label="Personal" 
          label1="Medical " 
          label2="Lifestyle">
        </MainTabs>

        <TabPanel value={value} index={0}>
          <PatientPersonalInformation personal={goToMedical} patientId={patientId} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <PatientMedicalInformation Medical={goToLifestyle} patientId={patientId} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <PatientLifestyle patientId={patientId} />
        </TabPanel>
      </div>
      
    </MainWrapper>
  );
}
