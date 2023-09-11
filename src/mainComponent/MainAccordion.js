import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const MainAccordion = (props) =>{
    return(
        <div>
            <div  style={{height:'40px',  backgroundColor:'#d7eaf5'}} expandIcon={<ExpandMoreIcon />}>
                <Typography className="m-2" align='left' style={{color:'black'}}><b><h5>{props.title}{props.fees}</h5></b></Typography>
            </div>
            <div>
                <Typography>
                    {props.children}
                </Typography>
            </div>
        </div>
    )
}
export {MainAccordion}