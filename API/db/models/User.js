const { Model, DataTypes } = require('sequelize');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				number: DataTypes.STRING,
				firstName: DataTypes.STRING,
				lastName: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.STRING,
				status: DataTypes.STRING,
				avatarURL: DataTypes.STRING
			},
			{
				hooks: {
					beforeUpdate: (user) => {
						const prevUser = user['_previousDataValues'];
						return this.deleteUserAvatar(prevUser);
					},
					beforeDestroy: (user) => {
						return this.deleteUserAvatar(user);
					}
				},
				sequelize
			}
		);
	}

	static deleteUserAvatar(user) {
		console.log('hi');
		if (!user.avatarURL) return;

		const avatarKey = user.avatarURL
			.split('/')
			.splice(-1)
			.toString();

		if (process.env.NODE_ENV === 'development') {
			return promisify(fs.unlink)(
				path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', avatarKey)
			);
		} else {
			return s3
				.deleteObject({
					Bucket: process.env.AWS_AVATARS_BUCKET_NAME,
					Key: avatarKey
				})
				.promise();
		}
	}
}

module.exports = User;
