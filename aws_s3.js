// import fs from "fs"
var S3 = require("aws-sdk/clients/s3");
const AWS = require("aws-sdk");

const upload = (data) => {
	const s3 = new AWS.S3({
		accessKeyId: "AKIAIU7336BAOIZ2DTDA",
		secretAccessKey: "QJl1EyJxc02Z2hFEQ/xkfbg2JAXl8K48ZE7K/OvX",
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
