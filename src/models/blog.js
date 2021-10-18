const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const BlogPost = new Schema({
    nama:{
        type: String,
        required: true,
    },
    hargabeli:{
        type: Number,
        required: true,
    },
    hargajual : {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    // tanggal: {
    //      type: Date,
    //     required: true,
    // },
}, {
    timestamps:true
    
})

module.exports = mongoose.model('BlogPost', BlogPost);