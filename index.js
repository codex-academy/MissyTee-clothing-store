const garments = document.querySelector('.garments');

const garmentList = [{
		description : 'Long sleeve jacket',
		price : 275.00
	},
	{
		description : 'Female golf shirt',
		price : 179.00
	}
];

garments.addEventListener('click', function(evt){
	alert(evt.target.dataset.id);
});