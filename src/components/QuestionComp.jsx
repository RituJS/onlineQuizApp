import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom/dist';
import '../../src/App.css';

const QuestionComp = ({ currentQues, setCurrentQues, questions, options, correctAns, score, setScore, setQuestions }) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes

    const navigate = useNavigate();

    // useEffect to update timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                // Timer has reached 0, navigate to the result page or handle it as needed
                clearInterval(interval);
                navigate('/result');
            }
        }, 1000);

        // Clear interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, [timer, navigate]);

    const handleSelect = (i) => {
        if (selected === i && selected === correctAns) {
            return 'select';
        } else if (selected === i && selected !== correctAns) {
            return 'wrong';
        } else if (i === correctAns) {
            return 'select';
        }
    };    

    const handleCheck = (i) => {
        setSelected(i);
        if(i === correctAns) setScore(prevScore => prevScore + 1);
        setError(false)
    }

    const handleNext = (() =>{
        if (currentQues > 8) {
            navigate("/result")
            setScore(0);
        } else if (selected) {
            setCurrentQues (currentQues + 1)
            setSelected();
        } else {
            setError ("Please select an option")
        }
    })

    const handleQuit = (() =>{})

    return (
        <div className='question-container'>
            <h2>Question {currentQues + 1}</h2>
            <p>Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</p>
            <div className='currentQues-content'>
                <h2>{questions[currentQues].question}</h2>
                <div className='option-content'>
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    {options &&
                        options.map((i) => (
                            <button
                                key={i}
                                onClick={() => handleCheck(i)}
                                className={`single-option ${selected && handleSelect(i)}`}
                                disabled={selected}
                            >
                                {i}
                            </button>
                        ))}
                </div>
                <div className='quit-nextQues'>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        style={{ width: 185 }}
                        href='/'
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                    <Button variant='contained' color='primary' size='large' style={{ width: 185 }} onClick={handleNext}>
                        Next Question
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionComp;
