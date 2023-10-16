import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { useQuizContext } from '../api/QuizContext';


const QuestionComp = ({ options, correctAns }) => {
    const { quizValue, updateQuizValue  } = useQuizContext();
    const { name, currentQues, setCurrentQues, questions, setScore, setQuestions} = quizValue;

    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [timers, setTimers] = useState([]); // Array to store timers for each question
    const navigate = useNavigate();

    // console.log("option correctans===========", options, correctAns)

    // console.log("name, ques=========quiz 2========", name, questions)
    // This useEffect runs whenever questions change or component mount.
    useEffect(() => {
        const initialTimers = questions.map(() => 60); // 60 seconds (1 minute) for each question
        setTimers(initialTimers);
    }, [questions]);

    // update timers every second
    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimers = timers.map((timer, index) => {
                if (index === currentQues) {
                    if (timer > 0) {
                        return timer - 1;
                    } else {
                        // Timer for the current question has reached 0, move to the next question
                        clearInterval(interval);
                        if (currentQues < 9) {
                            updateQuizValue({currentQues: currentQues + 1});
                            setSelected();
                        } else {
                            // If all questions are answered, navigate to the result page
                            navigate('/result');
                        }
                        return timer; // Return the timer value for the current question
                    }
                }
                return timer; // Return the timer value for other questions
            });

            setTimers(updatedTimers);
        }, 1000);

        // Clear interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [currentQues, timers, navigate, setCurrentQues]);


    //changing the color of the correct answer to green 
    //else if  changing the color of the wrong answer to red 
    // if the answer is wrong then color the correct answer with green color


    const handleSelect = (i) => {
        if (selected === i && selected === correctAns) {
            return 'select';
        } else if (selected === i && selected !== correctAns) {
            return 'wrong';
        } else if (i === correctAns) {
            return 'select';
        }
    };
    

    //increase the score if the answer is correct
    const handleCheck = (i) => {
        setSelected(i);
        if (i === correctAns) 
        updateQuizValue({score: quizValue.score + 1});
        setError(false);
    };

    // handle the next button
    const handleNext = () => {
        if (currentQues > 8) {
            navigate('/result');
        } else if (selected) {
            updateQuizValue({currentQues: currentQues + 1});
            setSelected();
        } else {
            setError('Please select an option');
        }
    };

    //   handle the quit button
    const handleQuit = () => {
        // updateQuizValue({currentQues: 0});
        // setQuestions([]);
        // setScore(0);
    };

    return (
        <div className="question-container">
            <h2>Question {currentQues + 1}</h2>
            <p>Time Left: {Math.floor(timers[currentQues] / 60)}:{timers[currentQues] % 60 < 10 ? '0' : ''}{timers[currentQues] % 60}</p>
            <div className="currentQues-content">
                <h2>{questions[currentQues].question}</h2>
                <div className="option-content">
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    {options &&
                        options.map(i => (
                            <button
                                key={i}
                                onClick={() => handleCheck(i)}
                                className={`single-option ${selected && handleSelect(i)}`}
                                // if one option is selected then disable the rest options
                                disabled={selected}
                            >
                                {i}
                            </button>
                        ))}
                </div>
                <div className="quit-nextQues">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ width: 185 }}
                        href="/"
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                    <Button variant="contained" color="primary" size="large" style={{ width: 185 }} onClick={handleNext}>
                        Next Question
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionComp;
