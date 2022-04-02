const { response } = require('express');
const { request } = require('express');
const User = require('../model/user.model');
const jwt=require('jsonwebtoken');
exports.signUp = (request, response, next) => {
    console.log(request.body);
    const user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.password = request.body.password;
    user.save()
        .then(result => {
            console.log(result)
            return response.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps! Something Went Wrong" })
        })
}
exports.signin = (request, response, next) => {
    console.log(request.body);
    User.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            if(request){
                let payload={subject:result._id};
                let token=jwt.sign(payload,'fegggjjhjffffffffsddsjjkdsf');
                return response.status(200).json({
                    status:'login success',
                    current_user:result,
                    token:token
                });
            }
            // console.log(result);
            // if (result)
            //     return response.status(200).json(result);
            else
                return response.status(204).json({ message: "No user Found" })
        })
        .catch(err => {
            // console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        })
}
exports.userList = (request, response, next) => {
    User.find()
        .then(result => {
            console.log(result);
            if (result)
                return response.status(200).json(result);
            else
                return response.status(204).json({ message: "No user Found" })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "OOps!Something Went Wrong" });
        })

}