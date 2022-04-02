const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./router/user.router');
const categoryRouter=require('./router/category.router');

const cors = require('cors')

const app = express();
mongoose.connect("mongodb+srv://somikaverma:somikaverma12@mymongodb.q7idm.mongodb.net/backend?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database Connection SuccessFully Estabilished");
    })
    .catch(err => {
        console.log(err);
    });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(userRouter)
app.use(categoryRouter)
app.listen(process.env.PORT || 5000,
    () => console.log("Server is running port 1000")); 