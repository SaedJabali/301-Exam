'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const superagent = require('superagent');
const Characters = require('./Model/CharacterModel');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
// const DB = process.env.DATABASE_URL;

mongoose.connect(`mongodb://localhost:27017/favorite`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());


// API proof of life
app.get('/', (req, res) => {
    res.send('everything is working!')
});

// Reading the data from the API 
app.get('/get-characters', (req, res) => {
    const url = `https://psychonauts-api.herokuapp.com/api/characters?limit=10`
    superagent.get(url).then(charData => {
        const charArr = charData.body.map(element => new Character(element))
        res.send(charArr);
    })
})

app.post('/favorite', (req, res) => {
    const { name, gender, img, powers } = req.body
    Characters.find({ name: name }, (error, result) => {
       if (error){
           res.send(`error happened`, error)
       }
        if (result.lenght == null) {
            let charArr = new Characters({
                name:name,
                gender:gender,
                img:img,
                powers:powers
            })
            charArr.save();
            res.send(charArr)
            console.log(`this is newchar`,charArr);
        } else {
            // console.log(`this is newchar`,newChar);

            res.send('Data already exists');
        }
    })
})

app.get('/favorite' , (req,res)=>{
    Characters.find({}, (error,result)=>{
        res.send(result);
    })
})

app.delete('/favorite/:name' , (req,res)=>{
const name = req.params.name
Characters.remove({name:name}, (error,result)=>{
    res.send(result)
})
}) 

class Character {
    constructor(data) {
        this.name = data.name,
            this.gender = data.gender,
            this.img = data.img,
            this.powers = data.psiPowers
    }
}
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});