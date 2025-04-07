// const express = require('express')
import express from 'express'

const app = express()
const port = 3000

function react(req,res){
  console.log("react has been called");
  res.send('Hello shulamit!');

}

app.get('/', react)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})