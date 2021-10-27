import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useStyles} from "../dashboardcardstyle";
const MainCards =(props)=>{
    const classes = useStyles();

    return(
        <div className="colum">
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {props.Typography}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {props.Typography1}
                    </Typography>
                    <Typography variant="body2" component="p">
                    {props.Typography2}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions className="dashbutton">
                    <Button  size="small" onClick={props.onClick}>{props.children}</Button>
                </CardActions>
            </Card>
        </div> 
    )
}
export {MainCards}