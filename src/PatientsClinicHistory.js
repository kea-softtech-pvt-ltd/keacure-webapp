import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {MainAccordion} from "./mainComponent/MainAccordion";
export default function PatientsClinicHistory(){
    return(
        <main>
            <div className="container margin_120_95">			
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        <nav id="secondary_nav">
                            <div className="container">
                                <span>Clinic History</span>
                            </div>
                        </nav>
                        <div className="box_form">
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <MainAccordion title={"Nobel Clinic"}>
                                        <div className="accordian">
                                        <span>1.</span>Shubhangi Suryawanshi
                                        </div>
                                        <div className="accordian">
                                        <span>2.</span>Ravina Nikam
                                        </div>
                                        <div className="accordian">
                                        <span>3.</span>Karishma Kulkarni
                                        </div>
                                    </MainAccordion>
                                    <Accordion>
                                        <AccordionSummary className="AccordionSummary" expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Sidhhi Clinic</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className="accordian">
                                                <span>1.</span>Shubhangi Suryawanshi
                                                </div>
                                                <div className="accordian">
                                                <span>2.</span>Ravina Nikam
                                                </div>
                                                <div className="accordian">
                                                <span>3.</span>Karishma Kulkarni
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Nobel Clinic</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className="accordian">
                                                <span>1.</span>Shubhangi Suryawanshi
                                                </div>
                                                <div className="accordian">
                                                <span>2.</span>Ravina Nikam
                                                </div>
                                                <div className="accordian">
                                                <span>3.</span>Karishma Kulkarni
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography>Nobel Clinic</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div className="accordian">
                                                <span>1.</span>Shubhangi Suryawanshi
                                                </div>
                                                <div className="accordian">
                                                <span>2.</span>Ravina Nikam
                                                </div>
                                                <div className="accordian">
                                                <span>3.</span>Karishma Kulkarni
                                                </div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}