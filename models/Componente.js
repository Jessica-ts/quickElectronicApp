const mongoose = require('mongoose');
const {Schema} = mongoose;
const path = require('path');

const coverImageBasePath = 'uploads/componentes'

const ComponenteSchema = new Schema({
	nombre: String,
	descripcion: String,
	filename: { type: String },
	usuario : {type : String}
});


module.exports= mongoose.model('Componente', ComponenteSchema);
