const MongoClient = require("mongodb").MongoClient;

const connectionString =
	"mongodb+srv://test:test@cluster0.bzfa8.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then((client) => client)
	.catch((error) => console.error(error));
