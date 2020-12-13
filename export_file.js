const { Parser } = require("json2csv");
const s3Uploader = require("./aws_s3");

const downloadFile = (res, fileName, fields, data) => {
	const json2csv = new Parser({ fields });
	const csv = json2csv.parse(data);
	res.header("Content-Type", "text/csv");
	res.attachment(fileName);
	return s3Uploader.upload(csv);
	// return res.sendFile(csv);
};

module.exports = {
	downloadFile,
};
