const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    date: {type: Date, default: Date.now, required: Boolean},
    value: {type: String, unique: true, required: Boolean},
    userId: {type: Types.ObjectId, ref: 'User'},
}) 

module.exports = model('Todo', schema);