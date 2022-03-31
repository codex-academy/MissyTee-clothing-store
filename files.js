const fs = require('fs');

const files = fs.readdirSync('./images');

const f = files.map((fileName) => {
	return {
		img: fileName,
		description: "lorem ipsum",
		price: 0.00

	}
});

console.log(f);

fs.writeFileSync('./garments.json', JSON.stringify(f));