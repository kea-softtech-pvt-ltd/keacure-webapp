import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const MainAccordion = (props) =>{
    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{props.title}{props.fees}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {props.children}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}
export {MainAccordion}