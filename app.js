const express = require("express");
const exphbs  = require('express-handlebars');

const app = express();
const garments = require('./garments.json');
const { Level } = require('level')

const db = new Level('garments.db', { valueEncoding: 'json' })

// enable the req.body object - to allow us to use HTML forms
// when doing post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', async function(req, res){
	// console.log(garments)

	const garmentList = [];


	for (const garment of garments){
		try {
			const storedGarment = await db.get(garment.img);
			// console.log('storedGarment...');
			// console.log(storedGarment);
			// garment = {...storedGarment}

			garmentList.push(storedGarment)

		} catch (err) {
			garmentList.push(garment)
		}
	}

	res.render('index', {
		garments : garmentList
	});
});

app.post('/garment', async function(req, res) {
	try {
		console.log(req.body);
		const {img} = req.body;
		await db.put(img, req.body);
	} catch( err) {
		console.log(err);
	}


	res.redirect('/')
});


app.listen(process.env.port | 4011, () => {
	console.log("app started");
})