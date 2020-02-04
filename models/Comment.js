/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;*/

const {Schema, model} = require('mongoose');

const CommentSchema = Schema(
{
	post_id: { type: String },
	comment: { type: String },
	postedBy: { type: String }
});

module.exports = model('Comment', CommentSchema);