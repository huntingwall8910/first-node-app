const express = require("express");
const session = require("express-session");
const app = express();
app.use(session({
    secret: "0bd8971ae08863f09b694fc00dcc1cb8a95af58cc37ccb377948cd4e328cddf9",
    resave: false,
    saveUninitialized: true
}));
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
const questions = [
    {
        question:"What is 9 + 10?",
        choices:["19","910","21","91"],
        answer:2
    },
    {
        question:"Erm What the _____",
        choices:["sigma","skibidi","gyatt","rizz"],
        answer:0
    },
]
app.get("/", (req,res) => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    req.session.randomQuestion = randomQuestion;
    res.render("index",{question: randomQuestion});
})
app.post("/submit", (req,res) => {
    console.log(req.body.options)
    let isCorrect = req.body.options == res.session.randomQuestion.answer
    res.send(isCorrect.toString())
})
app.listen(3000)