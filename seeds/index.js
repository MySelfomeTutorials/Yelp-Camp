const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 30) + 10;
		const camp = new Campground({
			author: '64e9b7aee9aee118c2043b07',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/selfome/image/upload/v1693059509/YelpCamp/zrtoaryoykhv2hmemwmw.jpg',
					filename: 'YelpCamp/zrtoaryoykhv2hmemwmw',
				},
				{
					url: 'https://res.cloudinary.com/selfome/image/upload/v1693059511/YelpCamp/g5shlsa40hgsoldvawme.jpg',
					filename: 'YelpCamp/g5shlsa40hgsoldvawme',
				},
				{
					url: 'https://res.cloudinary.com/selfome/image/upload/v1693059514/YelpCamp/yo64fhvugjftocfstt4t.jpg',
					filename: 'YelpCamp/yo64fhvugjftocfstt4t',
				},
			],
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint similique iusto minus aspernatur explicabo ',
			price,
			geometry: {
				type: 'Point',
				coordinates: [-113.1331, 47.0202],
			},
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
