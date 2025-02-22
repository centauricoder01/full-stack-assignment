const express = require("express");
const app = express();
const port = 3001;
app.use(express.json());

const USERS = [];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
];

const SUBMISSION = [];

app.post("/signup", function (req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].email === email) {
      return res.status(401).send("This email already exist.");
    }
  }

  USERS.push({ email, password });
  // return back 200 status code to the client
  res.status(200).send("User Added successfully.");

  // res.send("Hello World!");
});

app.post("/login", function (req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Check if the user with the given email exists in the USERS array

  // Also ensure that the password is the same
  if (USERS.length === 0) {
    return res.status(401).send("Incorrect details");
  }

  console.log(email, password, "THIS IS EMAIL PASSWORD");

  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].email !== email || USERS[i].password !== password) {
      return res.status(401).send("Incorrect details");
    }
  }

  // If the password is the same, return back 200 status code to the client
  res
    .status(200)
    .send({ token: `bhs${Math.floor(1000 + Math.random() * 90000000)}desdik` });

  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client

  // res.send("Hello World from route 2!");
});

app.get("/questions", function (req, res) {
  //return the user all the questions in the QUESTIONS array
  res.send(QUESTIONS);
});

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.send(SUBMISSION);
});

app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  SUBMISSION.push(req.body);
  let value = Math.floor(1 + Math.random() * 2);

  if (value === 1) {
    res.send("All Testcase Passed");
  } else {
    res.send("Some Testcase Failed");
  }
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
