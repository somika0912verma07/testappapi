const express = require('express');
const { validationResult } = require('express-validator');
const category = require('../model/category.model');


exports.add = (request, response, next) => {
    console.log(request.body);
    console.log(request.file);

    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ errors: errors.array() });

    category.create({
        categoryName: request.body.categoryName,
        categoryImageUrl: "http://localhost:5000/images/" + request.file.filename

    }).then(result => {
        //console.log(result);
        return response.status(201).json(result);
    }).catch(err => {
        return response.status(403).json({ message: 'Oops Something went wrong' })
    })
}






// exports.getCategory = (request, response) => {
//     category.find().then(results => {
//             return response.status(200).json(results);
//         })
//         .catch(err => {
//             return response.status(500).json({ message: 'Sever issues' });
//         });
// }


// exports.deleteCategory = (request, response) => {
//     category.deleteOne({ _id: request.params.id })
//         .then(result => {
//             if (result.deletedCount)
//                 return response.status(202).json({ message: 'Data has been deleted successfully' });
//             else
//                 return response.status(204).json({ message: 'unable to delete' });
//         })
//         .catch(err => {
//             return response.status(500).json({ message: 'Something went wrong' });
//         });
// }


// exports.update = (request, response, next) => {
//     let id = request.params.categoryId;
//     console.log(request);
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//         return response.status(400).json({ errors: errors.array() });
//     }
//     category.updateOne({ _id: id }, {
//         $set: {
//             categoryName: request.body.categoryName,
//             categoryImageUrl: "http://localhost:5000/images/" + request.file.filename
//         }
//     }).then(result => {
//         if (result.modifiedCount)
//             return response.status(204).json(result, { new: true });
//         else
//             return response.status(404).json({ message: 'record not found' });
//     }).catch(err => {
//         return response.status(500).json({ message: 'Something went wrong..' });
//     });
// }