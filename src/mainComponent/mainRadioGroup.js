import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from "@material-ui/core/FormControl";
import { StyledRadio } from "../radiobutton";

const MainRadioGroup = (props) =>{
    return(
        <FormControl component="fieldset">
            <RadioGroup defaultValue="female" aria-label="gender"  name="customized-radios">
                <FormControlLabel name={props.name} value={props.value} onChange={props.onChange} control={<StyledRadio />} label={props.label} />
                <FormControlLabel name={props.name} value={props.value1} onChange={props.onChange}  control={<StyledRadio />} label={props.label1} />
                <FormControlLabel name={props.name} value={props.value2} onChange={props.onChange}  control={<StyledRadio />} label={props.label2} />
            </RadioGroup>
            {props.children}
        </FormControl>
    )
}
export {MainRadioGroup}