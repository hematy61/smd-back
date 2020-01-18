const mongoose = require("mongoose");
//
mongoose
	.connect(process.env.MONGODB_URL, {
		// useCreateIndex assures us that when mongoose connect to mongodb,
		// the indexes are created
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("connected to database");
	})
	.catch(error => {
		console.log("Failed to connect to database!!!");
		console.log(error);
	});
