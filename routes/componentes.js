const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const router = express.Router();
const multer = require ('multer');
const {randomNumber} = require('../helpers/libs');

const Componente = require('../models/Componente');
const User = require('../models/Usuario');
const Comment = require('../models/Comment');

const {isAuthenticated} = require('../helpers/auth');

let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let uuid = require('uuid/v4');

router.get('/componentes/add', isAuthenticated, (req, res) => 
{
	res.render('componentes/nuevo-componente.hbs');
});

router.post('/componentes/nuevo-componente', isAuthenticated, async (req, res) => 
{
	const {nombre,descripcion} = req.body;
	const errors = [];
	const imgUrl = randomNumber();
	const repetir = await Componente.find({filename : imgUrl});

	if(!nombre)
	{
		errors.push({text: 'Escribe un nombre'});
	}
	else if(!descripcion)
	{
		errors.push({text: 'Escribe una descripcion'});
	}
	else if(errors.length>0)
	{
		res.render('componentes/nuevo-componente', {errors, nombre, descripcion});
	}
	
	else
	{	
		if(repetir.length > 0)
		{
			imgUrl = randomNumber();
		}
		const imagebc = req.file.path;
		const ext = path.extname(req.file.originalname).toLowerCase();
		const targetPath = path.resolve(`public/uploads/${imgUrl}${ext}`);

		if(ext === '.png' || ext ==='.jpg' || ext === '.jpeg')
		{
			//Rename mueve un archivo de un directorio a otro
			await fs.rename(imagebc, targetPath);
			const newComponente = new Componente({
				
				nombre : req.body.nombre,
				descripcion: req.body.descripcion,  
				filename: imgUrl + ext
			})
			newComponente.user = req.user.id;
			await newComponente.save();
			console.log(newComponente);
			req.flash('success_msg', 'Componente agregado correctamente');
			
		}
		else
		{
			await fs.unlink(imagebc);
			req.flash('error_msg', 'Solo se aceptan imagenes en este campo');
		}
		console.log("Agregue componente");
		res.redirect('/componentes');
	}
	

});

router.get('/componentes', isAuthenticated, async (req, res) => {
	const componentes = await Componente.find().sort({date: 'desc'});
	res.render('componentes/componentes', {componentes});
});

router.get('/search', isAuthenticated, async(req, res) =>{
	let searchOptions = {}

	if(req.query.nombre != null)
	{
		searchOptions.nombre = RegExp(req.query.nombre, 'i')
	}
	try	
	{
		const busquedas = await Componente.find(searchOptions).sort({date: 'desc'});
		res.render('componentes/search-componentes', { busquedas, searchOptions:req.query.nombre});
	}
	catch
	{
		req.flash('error_msg', 'Componente no encontrado');
	}

});

router.get('/componentes/comentar', isAuthenticated, async (req, res) => 
{
	res.render('/comentar');
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
		req.flash('success_msg', 'Comentario agregado correctamente');
	}
	res.redirect('/comentar/' + newComment);
});


router.get('/componentes/editar/:id',isAuthenticated, async (req, res) => {
	const componente = await Componente.findById(req.params.id);	
	console.log(componente);
	res.render('componentes/editar-componente', {componente});
});

router.put('/componentes/editar-componente/:id', isAuthenticated, jsonParser, async (req,res) => 
{
	const {nombre, descripcion, filename}= req.body;
	
	if(filename=="")
    	await Componente.findByIdAndUpdate(req.params.id, { nombre, descripcion, filename});

    else
    	await Componente.findByIdAndUpdate(req.params.id, { nombre, descripcion});

    req.flash('success_msg', 'Componente editado exitosamente');
	res.redirect('/componentes');	
});

router.delete('/componentes/delete/:id', isAuthenticated, async (req, res) => {
	await Componente.findByIdAndDelete(req.params.id);
	req.flash('success_msg', 'Componente eliminado exitosamente');
	res.redirect('/componentes');
});

/*router.delete('/componentes/deleteCom/:id', isAuthenticated, async (req, res) => 
{
	await Comment.findByIdAndDelete(req.params.id);

	req.flash('success_msg', 'Comentario eliminado exitosamente');
	res.redirect('/componentes');
});*/

module.exports = router;