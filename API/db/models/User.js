const { Model, DataTypes } = require('sequelize');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const s3 = new aws.S3();

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				username: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						},
						isEmail: {
							msg: 'This field must be a valid email address.'
						}
					}
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						}
					}
				},
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
					},
					afterCreate: (user) => {
						user.password = undefined;
						return user;
					}
				},
				sequelize
			}
		);
	}

	static deleteUserAvatar(user) {
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
