<h1>quickElectronic App</h1>

<p>Aplicación diseñada para aquellos estudiantes de ISD'R que se encuentran iniciando su carrera y tienen el interés de familiarizarse lo más rápido posible con los componentes electrónicos que estarán utilizando durante la carrera. Dentro del contenido de la aplicación se encuentra información sobre algunos componentes básicos, sección de videos donde pueden ver el funcionamiento de algunos componentes, sección de blog para interactuar entre usuarios sobre dudas que tengan acerca de los componentes, sección de tiendas donde viene información acerca de algunas tiendas en Monterrey donde se pueden comprar estos componentes. Además, el usuario puede editar información acerca de algún componente o agregar un nuevo componente.</p>

<h3>Lenguaje de programación utilizado</h3>

<p>La aplicación realiza una API REST con Node.js y utiliza mongoDB como su base de datos.La aplicación también utiliza el motor de plantillas Handlebar, que permite al usuario generar HTML con JavaScript simple.</p>


<h3>Organización de contenido</h3>
Carpeta Config: Verifica el correo electrónico del usuario y su contraseña sean correctos
Carpeta Helpers: Autentica que el usuario ha iniciado sesión
Carpeta models: Data schemas
Carpeta public: Carpeta donde se encuentra el archivo css y donde se guarda contenido estático como imágenes.
Carpeta routes: API routes
Carpeta views: all templates (handlebars) created are stored in this folder

<h3>Deployment</h3>
https://hidden-bayou-74433.herokuapp.com/quickElectronic