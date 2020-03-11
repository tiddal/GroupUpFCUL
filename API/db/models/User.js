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
				username: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: {
							msg: 'This field cannot be empty.'
						},
						notNull: {
							msg: 'This field is required.'
						},
						isAlphanumeric: {
							msg: 'This field must be an alphanumeric.'
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
						},
						is: {
							args: /^[a-zA-Z\u00C0-\u017F ]+$/i,
							msg: 'This field only accepts letters and spaces.'
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
						},
						is: {
							args: /^[a-zA-Z\u00C0-\u017F ]+$/i,
							msg: 'This field only accepts letters and spaces.'
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
				status: {
					type: DataTypes.STRING,
					validate: {
						isIn: {
							args: [['online', 'offline']],
							msg: 'The users status can only be online or offline'
						}
					}
				},
				avatarURL: {
					type: DataTypes.STRING,
					validate: {
						isUrl: {
							msg: 'This field must be an URL'
						}
					}
				}
			},
			{
				hooks: {
					beforeUpdate: (user) => {
						const prevUser = user['_previousDataValues'];
						if (user.avatarURL) {
							return this.deleteUserAvatar(prevUser);
						}
						user.avatarURL = prevUser.avatarURL;
						return user;
					},
					beforeDestroy: (user) => {
						return this.deleteUserAvatar(user);
					},
					afterCreate: (user) => {
						user.password = undefined;
						return user;
					},
					afterUpdate: (user) => {
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
