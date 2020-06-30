const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
	local: multer.diskStorage({
		destination: (request, file, callback) => {
			callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
		},
		filename: (request, file, callback) => {
			crypto.randomBytes(16, (error, hash) => {
				if (error) callback(error);
				file.key = `${hash.toString('hex')}-${file.originalname}`;
				callback(null, file.key);
			});
		},
	}),
	s3: multerS3({
		s3: new aws.S3(),
		bucket: process.env.AWS_FILES_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: (request, file, callback) => {
			crypto.randomBytes(16, (error, hash) => {
				if (error) callback(error);
				const fileName = `${hash.toString('hex')}-${Date.now()}`;
				callback(null, fileName);
			});
		},
	}),
};

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
	storage: storageTypes['s3'],
	limits: {
		fileSize: 15 * 1024 ** 2,
	},
	fileFilter: (request, file, callback) => {
		const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error('Invalid file type.'));
		}
	},
};
