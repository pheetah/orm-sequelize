const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');

const { DataTypes } = Sequelize;

const sequelize = new Sequelize('sequelize-new', 'root', 'sifre', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3305,
    define: {
        freezeTableName: true
    }
});

sequelize.authenticate().then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log('connection failed: ', err);
});

sequelize.drop({ match: /test$/}); // drop tables that and with test


const User = sequelize.define(
    'user',
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4,6]
            },
            get(){
                const rawValue = this.getDataValue('username');
                return rawValue.toUpperCase();
            }
        },
        password: {
            type: DataTypes.STRING,
            set(value){
                const salt = bcrypt.genSaltSync(12);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash);
            }
        },
        age:{
            type: DataTypes.INTEGER,
            defaultValue: 18
        },
        description:{
            type: DataTypes.STRING,
            set(value){
                const compressed = zlib.deflateSync(value).toString('base64');
                this.setDataValue('description', compressed);
            },
            get(){
                const value = this.getDataValue('description');
                const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
                return uncompressed.toString();
            }
        }
    },
    {
        freezeTableName: true, //user instead of users
        timestamps: false //discard createdAt and updatedAt
    }
);

User.sync({alter: true}).then((data) => {
    return User.create({
        username: 'Wire',
        password: 'soccerpizza',
        description: 'this description can be very long'
    });
}).then((data) => {
    console.log(data.username);
    console.log(data.password);
    console.log(data.description);
}).catch((err) => {
    console.log('user integration failed', err);
});