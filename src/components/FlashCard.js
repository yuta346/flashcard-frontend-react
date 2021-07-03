import React, {useState} from "react";
import '../App.css'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));

const FlashCard =(props) =>{

    const {word, speech, definition, short_definition, example, choices} = props.flashCard;
    const [flip, setFlip] = useState(false);
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value ===short_definition) {
        setHelperText('You got it!');
        setError(false);
        } else if (value === 'worst') {
        setHelperText('Sorry, wrong answer!');
        setError(true);
        } else {
        setHelperText('Please select an option.');
        setError(true);
        }
    };

    
    return (<div className="flashCard">

                {flip ? <div>
                            <div className="flashCard-top"/>
                            <div className="flashCard-middle">
                                <p><span className="flashCard-definition">Definition: </span>{definition}</p>
                                <p><span className="flashCard-p">Speech: </span> {speech}</p>
                                <p><span className="flashCard-p">Usage: </span>{example}</p>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="flashCard-top"/>
                            <div className="flashCard-middle">
                                <p className="flashCard-word">{word}</p>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <FormControl component="fieldset" error={error} className={classes.formControl}>
                                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                                    <FormControlLabel value={choices[0]} control={<Radio color="secondary"/>} label={choices[0]} />
                                    <FormControlLabel value={choices[1]} control={<Radio color="secondary"/>} label={choices[1]} />
                                    <FormControlLabel value={choices[2]} control={<Radio color="secondary"/>} label={choices[2]} />
                                    <FormControlLabel value={choices[3]} control={<Radio color="secondary"/>} label={choices[3]} />
                                    </RadioGroup>
                                    <FormHelperText>{helperText}</FormHelperText>
                                    <Button type="submit" variant="outlined" color="default" className={classes.button}>
                                    Check Answer
                                    </Button>
                                </FormControl>
                            </form>



                        </div>      
                }
                <div className="flashCard-bottom">
                    <p onClick={()=> setFlip(!flip)}>FLIP CARD TO LEARN MORE</p>
                </div> 
                
            </div>)

}

export default FlashCard;