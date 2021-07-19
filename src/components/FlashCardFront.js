// import React from "raect";
import React, {useState} from "react";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
      width: "100%",
    },
  }));


const FlashCardFront = (props) => {

    const classes = useStyles();
    const word = props.word
    const short_definition = props.short_definition
    const choices = props.choices
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('Choose wisely...');
    const nextFlashCard = () => {props.nextFlashCard()}
    sessionStorage.setItem("type", props.type)



    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    };


    const handleSubmit_quiz = (event) => {
        if (value === short_definition) {
            setHelperText('You got it!');
            let isMastered = JSON.parse(sessionStorage.getItem("isMastered"));
            isMastered[word][1] = true;
            sessionStorage.setItem("isMastered",JSON.stringify(isMastered));
            setError(false);
            nextFlashCard()
        } else if (value !== short_definition) {
            setHelperText('Sorry, wrong answer!');
            setError(true);
            nextFlashCard()
        } else {
            setHelperText('Please select an option.');
            setError(true);
            nextFlashCard()
        }
    };

    const handleSubmit_study = (event) => {
        if (value === short_definition) {
            setHelperText('You got it!');
        } else if (value !== short_definition) {
            setHelperText('Sorry, wrong answer!');
        } else {
            setHelperText('Please select an option.');
        }
    }

    return (<div>
                <div className="flashCard-top"/>
                <div className="flashCard-middle">
                    <p className="flashCard-word">{word}</p>
                </div>     
                <div>
                    <FormControl component="fieldset" error={error} className={classes.formControl}>
                        <RadioGroup aria-label="quiz" 
                                    name="quiz" 
                                    value={value} 
                                    onChange={handleRadioChange} 
                                    style={sessionStorage.getItem('type') =="quiz"  ?{marginTop:"30px"}:null}>
         
                        {(choices.length === 1 || choices.length > 1)  && <FormControlLabel value={choices[0]} control={<Radio color="secondary"/>} label={choices[0]} />}
                        {(choices.length === 2 || choices.length > 2) && <FormControlLabel value={choices[1]} control={<Radio color="secondary"/>} label={choices[1]} />}
                        {(choices.length === 3 || choices.length > 3) && <FormControlLabel value={choices[2]} control={<Radio color="secondary"/>} label={choices[2]} />}
                        {(choices.length === 4 || choices.length > 4) &&<FormControlLabel value={choices[3]} control={<Radio color="secondary"/>} label={choices[3]} />}
                        </RadioGroup>
                        { sessionStorage.getItem('type') =="quiz" ? null:<FormHelperText style={{ fontSize: 16}}>{helperText}</FormHelperText>}
                    </FormControl>
                    {sessionStorage.getItem('type') =="quiz" ? 
                        <Button type="submit" 
                                variant="outlined" 
                                color="default" 
                                className={classes.button}
                                onClick={handleSubmit_quiz}
                        >
                        Submit Answer
                        </Button>
                        :
                        <Button type="submit" 
                                variant="outlined" 
                                color="default" 
                                className={classes.button}
                                onClick={handleSubmit_study}
                        >
                        Check Answer
                        </Button>}
                </div>
            </div>  
    )
}

export default FlashCardFront;