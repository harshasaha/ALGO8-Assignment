// import fs from "fs"
var S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");

const upload = (data) => {
		console.log(process.env.S3_KEY);

	const s3 = new AWS.S3({
		accessKeyId: process.env.S3_KEY,
		secretAccessKey: process.env.S3_SECRET,
	});

	const params = {
		Bucket: "alg08",
		Key: "example.csv",
		Body: data,
	};
	return new Promise((resolve, reject) => {
		s3.upload(params, function (err, data) {
			if (err) {
				return reject(err);
			}
			return resolve(data);
		});
	});
};

module.exports = {
	upload,
};
