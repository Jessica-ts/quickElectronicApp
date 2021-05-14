/*const mongoose = require('mongoose');
//const {Schema} = mongoose;
const Schema = mongoose.Schema;*/

const {Schema, model} = require('mongoose');

const CommentSchema = Schema(
{
	post_id: { type: String },
	comment: { type: String, required: true },
	postedBy: { type: String, required: true }
});

module.exports = model('Comment', CommentSchema);