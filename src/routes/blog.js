const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');


// [POST] : /v1/post
router.post('/post',[body('hargabeli').isLength({min:4}).withMessage('Harga Beli Tidak Boleh Kosong dan Minimal 4 Karakter')] ,blogController.createBlogPost);
router.get('/posts', blogController.getAllBlogPost);
router.get('/post/:id', blogController.getByID);
router.put('/post/:id',[body('hargabeli').isLength({min:4}).withMessage('Harga Beli Tidak Boleh Kosong dan Minimal 4 Karakter')] , blogController.updateBlogPost);
router.delete('/post/:id', blogController.deleteBlogPost)

module.exports = router;