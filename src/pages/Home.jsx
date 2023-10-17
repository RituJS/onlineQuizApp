import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, MenuItem, TextField } from '@mui/material'

import Categories from '../Database/Category'
import { useQuizContext } from '../api/QuizContext'

import bannerImg from "../assets/images/quiz-banner.png"


const Home = () => {
  const { quizValue, updateQuizValue , fetchQuiz } = useQuizContext();
  const { name, category} = quizValue;
  const [level, setLevel] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!category || !level || !name) {
      setError(true);
      return;
    } else setError(false);
    const allQuestion = await fetchQuiz(category, level);
    updateQuizValue({questions : allQuestion})
    navigate("/quiz");
  }

  return (
    <div className="home-content">
      <form onSubmit={handleSubmit} className="quiz-setup">
        <span className="quiz-setting"> Enter the information</span>
        <div className="add-inputs">
          {/* {} curly braces used to add javascript expression (jsx). here if error is true then this error message will be shown */}
          {error && <div style={{ color: 'red', marginTop: '10px' }}>Please fill all fields</div>}

          <TextField
            label="Enter your Name"
            variant='outlined'
            className="input-field"
            onChange={(event) => updateQuizValue({name: event.target.value})} />

          <TextField select
            label="Select Category"
            variant='outlined'
            className="input-field"
            value={category}
            onChange={(event) => updateQuizValue({category: event.target.value})}
          >
            {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
          </TextField>

          <TextField select
            label="Select Difficulty"
            variant='outlined'
            className="input-field"
            value={level}
            onChange={(event) => setLevel(event.target.value)}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button type='submit' variant='contained' color='primary' size='large' className="input-field" >
            Start Quiz
          </Button>
        </div>
      </form>
      <div className="banner-img">
        <img src={bannerImg} alt="Banner" />
      </div>
    </div>

  )
}

export default Home

