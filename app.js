const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const min = 1;
let max = 5;
let randomNum;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

let Details = [];
let Tasks = [
    {
        title: "1",
        content: "Build Your Own RESTful API from Scratch"
    },
    {
        title: "2",
        content: "Deploying Your Web Application"
    },
    {
        title: "3",
        content: "Create a Website that People Love"
    },
    {
        title: "4",
        content: "Build Your Own RESTful API from Scratch"
    },
    {
        title: "5",
        content: "Deploying Your Web Application"
    },
    {
        title: "6",
        content: "Create a Website that People Love"
    },
];
// index 

app.get("/", (req,res)=>{
    res.render("index");
});
// // add range 

// app.post("/range",(req,res)=>{
//     max = req.body.selectRange;
//     console.log(max);
//     if(!isNaN(max)){
//         res.render("question");
//     }
//     else{
//         res.redirect("/");
//     }
// });


// question 

// app.get("/question",(req,res)=>{
//     res.render("question", {questions: Tasks} );
// });

//add task

app.get("/addtask",(req,res)=>{
    res.render("addtask",{questions: Tasks});
});

app.post("/addtask",(req,res)=>{
    const Task = {
        title: req.body.taskTitle,
        content: req.body.taskBody
      }
  Tasks.push(Task);
  
  var myJSON = JSON.stringify(Task);
  console.log(myJSON);
  res.render("addtask",{questions: Tasks});
});

// student 

app.get("/student",(req,res)=>{
    res.render("student", {max: max, questions: Tasks, msg0: '', msg1: '', msg2: ''});

});

app.post("/student",(req,res)=>{
    const num = randomInteger(max,min); 
    randomNum = num;
    const Detail = {
        experimentNo: randomNum,
        name: req.body.name,
        email: req.body.email,
        section: req.body.section,
    };

    Details.push(Detail);
    var myJSON = JSON.stringify(Detail);
    console.log(myJSON);
    
    const msg0 = "Hey, "+ Detail.name + " [Section " + Detail.section + "] ";
    const msg1 = "You have got Experiment No: " + Detail.experimentNo; 
    const msg2 = "Confirmation Email of your experiment has been send on your registered mail " + Detail.email;

    res.render("student", {max: max, questions: Tasks, msg0: msg0, msg1: msg1, msg2: msg2, questions: Tasks} );
});

app.get("/login",(req,res)=>{
    res.render("login",{email: 'Testing1@gmail.com', password: 'Testing123', mgs: ''});
});

app.post("/login",(req,res)=>{
    if(req.body.email === "Testing1@gmail.com" && req.body.password === "Testing123"){
        res.redirect("addtask");
    }else{
        res.render("login",{email: '', password: '', msg: "Wrong Email or Password"});
    }
});

app.post("/delete",(req,res)=>{
    const checkedItem = req.body.checkbox;
    const ques = req.body.question;
    console.log(Tasks.findIndex(question=>{question.title}));

    Tasks.splice(Tasks.findIndex(question=>{ question.title === checkedItem}), 1);    
    console.log(Tasks);
    res.render("addtask",{questions: Tasks})
});



const Port = 3000 || process.env.PORT;

app.listen(Port, ()=>{
    console.log("Server running on PORT - "+ Port);
});