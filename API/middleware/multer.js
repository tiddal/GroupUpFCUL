const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const localPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

module.exports = {
	dest: localPath,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, localPath);
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) cb(err);
				const fileName = `${hash.toString('hex')}-${Date.now()}-${
					req.params.id
				}${path.extname(file.originalname)}`;
				cb(null, fileName);
			});
		}
	}),
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
