const express = require('express');
const bodyParser = require ('body-parser');

const cors= require('cors')
const app = express();
const mysql = require('mysql');


const db = mysql.createPool({
    host: "localhost",
    user:'root',
    password:'',
    database: 'cruddatabase'
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect =
        "select * from movie_reviews";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });

});




app.post('/api/insert',(req,res)=>{

    const movieName =req.body.movieName;
    const movieReview =req.body.movieReview;

    const sqlInsert =
        "insert into movie_reviews (movieName, movieReview) values( ?,?)";
    db.query(sqlInsert,[movieName, movieReview],(err,result)=>{
        console.log (result);
    });
});

app.delete('/api/delete/:movieName',(req,res)=>{
    const name=req.params.movieName
    const sqldelete =
    "delete from movie_reviews where movieName=?";

    db.query(sqldelete,name,(err,result)=>{
        if (err) console.log(err)
    });
});

app.put('/api/update',(req,res)=>{
    const name=req.body.movieName;
    const review=req.body.movieReview;
console.log(name,review)
    const sqlUpdate =
    "update movie_reviews set movieName=? where movieName=?";
    console.log(sqlUpdate)
    db.query(sqlUpdate ,[review,name],(err,result)=>{
        if (err) console.log(err)
    });
});


app.listen(3001,()=>{
   console.log ("running on port 3001");
});