import React from 'react'
import bannerImg from "../assets/images/question2.png"
import "../../src/App.css"
import { Button, MenuItem, TextField } from '@mui/material'
import Category from '../Database/Category'


const Home = () => {
  return (
    <>
    <div className="home-content">
    
    <div className="quiz-setup">
      <span className="quiz-setting"> Enter the information</span>
      
      <div className="add-inputs">
        <TextField label="Enter your Name" variant='outlined' className="input-field" />
        <TextField select label="Select Category" variant='outlined' className="input-field">
        {
          Category.map((cat) => (
            <MenuItem key={cat.category} value={cat.value}>
              {cat.category}
            </MenuItem>
          ))}
      </TextField>
          
          <TextField select label="Select Difficulty" variant='outlined' className="input-field">
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
            <Button variant='contained' color='primary' size='large' className="input-field">
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