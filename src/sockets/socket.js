const socket = io.on("connection", function(socket) {
	console.log("A new user just connected and socket id is: ", socket.id);

	// handle disconnection
	socket.on("disconnect", async function() {
		console.log("user disconnected");
	});
});

module.exports = socket;
