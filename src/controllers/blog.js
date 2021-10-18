const {validationResult} = require('express-validator');
const BlogPost = require('../models/blog');



exports.createBlogPost = (req, res, next) => {
    const {nama,hargabeli,hargajual,stock} = req.body;
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const err = new Error('Invalid Value');
       err.errorStatus = 400;
       err.data = errors.array();
       throw err;
    }

    const posting = new BlogPost({
        nama: nama,
        hargabeli : hargabeli,
        hargajual : hargajual,
        stock : stock,
       

        
    })

    posting.save()
    .then((result) => {
        res.status(201).json({
            message: "Data Berhasil Di Tambah",
            data: result
        })
    })
    .catch((error) => {
        console.log('error',error);
    })



    // dummy untuk mengecek data databse di postman
// const result = {
//     message: "Create BLog Post Success",
//     data: {
//         stock :1,
//         nama :"buku",
//         hargabeli : 10000,
//         hargajual : 15000,
//         create_at : "12/12/12",
       
//     }
// }

// res.status(201).json(result);

}

exports.getAllBlogPost = (req, res , next) => {


    BlogPost.find()
    .then((result) => {
        res.status(202).json({
            message: "Pemanggilan Data Berhasil",
            data: result
        })

    }).catch((err) => {
        console.log(err);
    })

}

exports.getByID = (req, res , next) => {
    const id = req.params.id;

    BlogPost.findById(id)
    .then((result) => {
        if(!result){
            const error = new Error('Data tidak di temukan');
            error.errorStatus = 404;
            throw error;

        }else{
            res.status(202).json({
                message: 'Data Brhasil Temukan',
                data: result
            })
        }

    })
    .catch((err) => {
        console.log(err);
    })
}


exports.updateBlogPost = (req, res , next) => {
    const {nama,hargabeli,hargajual,stock} = req.body;
    const id = req.params.id;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       const err = new Error('Invalid Value');
       err.errorStatus = 400;
       err.data = errors.array();
       throw err;
    }

    BlogPost.findById(id)
    .then((post) => {
        if(!post) {
            const err = new Error('Blog post tidak Ditemukan')
            err.errorStatus(404);
            throw err;
        }

        post.nama = nama;
        post.hargabeli = hargabeli;
        post.hargajual = hargajual;
        post.stock = stock;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'update success',
            data: result
        })
    })
    .catch((err) => {
        next(err);
    })
}


exports.deleteBlogPost = (req, res, next) => {

    const id = req.params.id;
    BlogPost.findById(id)
    .then(post => {
        if(!post){
            const err = new Error('Blog post tidak Ditemukan')
            err.errorStatus(404);
            throw err;
        }

        return BlogPost.findByIdAndRemove(id);

    })
    .then(result => {
        res.status(200).json({
            message: "Delete Berhasil",
            data:result

        })
    })

    .catch(err => {
        next(err);
    })
}