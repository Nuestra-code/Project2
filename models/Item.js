const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    owner : {
        type: objectId,
        required: true,
        ref: 'User'
    },

    name: {
        type: String,
        required: true,
        trim: true
    },
    
    description: {
       type: String,
       required: true
    },
    
    category: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    }
    }, 
    {
    timestamps: true
     
});

const item = mongoose.model('item', itemSchema);
module.exports = product;