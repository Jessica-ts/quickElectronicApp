const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();
const uuid = require('uuid/v4')

const Comment = require('../models/Comment');

const {isAuthenticated} = require('../helpers/auth');

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

router.get('/componentes/comentar', isAuthenticated, (req, res) => 
{
	res.render('componentes/comentar.hbs');
});

router.post('/componentes/comentar', isAuthenticated, async (req, res) => 
{
	const {comment, postedBy} = req.body;
	const errors = [];

	if(!comment)
	{
		errors.push({text: 'Escribe un comentario'});
	}
	else if(!postedBy)
	{
		errors.push({text: 'Escribe un nombre'});
	}

	else
	{
		const newComment = new Comment(
		{
			post_id :uuid(),
			comment : req.body.comment,
			postedBy: req.body.postedBy
		});

		//newComment.post_id = uuid();
		await newComment.save();
	}
		

	
	res.redirect('/comentar');
});

router.get('/perfil', isAuthenticated, (req, res) => {
	res.render('perfil');
});

router.get('/users/logout', (req, res) => {
	req.logout();
	res.redirect('/quickElectronic');
});

router.get('/quickElectronic', (req, res) => {
	res.render('quickElectronic');
});

router.get('/contacto', (req, res) => {
	res.render('contacto');
});

router.get('/tiendas', (req, res) => {
	res.render('tiendas');
});

router.get('/videos', (req, res) => {
	res.render('videos');
});

router.get('/comentar', (req, res) => {
	res.render('comentar');
});

module.exports = router;