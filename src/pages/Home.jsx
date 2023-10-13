import React, { useState } from 'react'
import bannerImg from "../assets/images/quiz-banner.png"
import "../../src/App.css"
import { Button, MenuItem, TextField } from '@mui/material'
import Categories from '../Database/Category'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../api/QuizContext'


const Home = (
  // { name, setName, fetchQuiz, setQuestions }
  ) => {

    const { name, setName, fetchQuiz, setQuestions, category, setCategory } = useQuizContext();

  // const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!category || !level || !name) {
      setError(true);
      return;
    } else setError(false)
   const allQuestion = await fetchQuiz(category, level);
   setQuestions(allQuestion)
    navigate("/quiz");
  }


  return (
    <>
      <div className="home-content">

        <div className="quiz-setup">
          <span className="quiz-setting"> Enter the information</span>

          <div className="add-inputs">

            {/* {} curly braces used to add javascript expression (jsx). here if error is true then this error message will be shown */}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>Please fill all fields</div>}

            <TextField
              label="Enter your Name"
              variant='outlined'
              className="input-field"
              onChange={(event) => setName(event.target.value)} />

            <TextField select
              label="Select Category"
              variant='outlined'
              className="input-field"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >

              {
                Categories.map((cat) => (
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
            <Button variant='contained' color='primary' size='large' className="input-field" onClick={handleSubmit}>
              Start Quiz
            </Button>
          </div>
        </div>
        <div className="banner-img">
          <img src={bannerImg} alt="Banner-Image" />
        </div>

      </div>
    </>
  )
}

export default Home