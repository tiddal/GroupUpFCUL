require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return 'local';
		case 'test':
			return 's3';
		case 'production':
			return 's3';
		default:
			return 'local';
	}
};
const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');
const storageTypes = {
	local: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, localPath);
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);
				file.key = `${hash.toString('hex')}-${Date.now()}-${
					req.params.id
				}${path.extname(file.originalname)}`;
				cb(null, file.key);
			});
		}
	}),
	s3: multerS3({
		s3: new aws.S3(),
		bucket: 'tiddal-test',
		contentType: multerS3.AUTO_CONTENT_TYPE,
		acl: 'public-read',
		key: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);
				const fileName = `${hash.toString('hex')}-${Date.now()}-${
					req.params.id
				}${path.extname(file.originalname)}`;
				cb(null, fileName);
			});
		}
	})
};

module.exports = {
	dest: localPath,
	storage: storageTypes[storageEnv()],
	limits: {
		fileSize: 2 * 1024 ** 2
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = [
			'image/jpeg',
			'image/pjpeg',
			'image/png',
			'image/gif'
		];

		allowedMimes.includes(file.mimetype)
			? cb(null, true)
			: cb(new Error('Invalid file type.'));
	}
};
