var express = require("express");
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
const exportFile = require("./export_file");
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

const uri =
	"mongodb+srv://test:test@cluster0.bzfa8.mongodb.net/ALGO8?retryWrites=true&w=majority";
MongoClient.connect(
	uri,
	{
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) return console.error("err ", err);
		console.log("Connected to Database");
		const db = client.db("ALGO8");
		const itemCollection = db.collection("item");

		app.get("/", function (req, res) {
			res.sendFile(__dirname + "/index.html");
		});

		app.post("/add", function (req, res) {
			itemCollection
				.insertOne(req.body)
				.then((result) => {
					console.log(result);
				})
				.catch((error) => console.error(error));
		});

		app.get("/export/:size/:type", (req, res) => {
			let q = {};
			let options = {};
			if (
				req.params &&
				req.params.type &&
				["A", "B", "C", "D"].includes(req.params.type)
			) {
				q.type = req.params.type;
			}

			if (req.params && req.params.size && parseInt(req.params.size)) {
				options.limit = parseInt(req.params.size);
			}
			itemCollection
				.find(q, options)
				.toArray()
				.then((results) => {
					return exportFile.downloadFile(
						res,
						"first_file.csv",
						["type", "field1", "field2", "field3", "field4", "field5"],
						results
					);
				})
				.then((result) => {
					res.send(result.Location);
				});
			// ...
		});

		var server = app.listen(3000, function () {
			var host = server.address().address;
			var port = server.address().port;
			console.log("Example app listening at http://%s:%s", host, port);
		});
	}
);
