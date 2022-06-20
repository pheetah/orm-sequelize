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
            defaultValue: 18,
            validate: {
                isNumeric: {
                    msg: 'you must enter a number for age!'
                }
                // isOldEnough(value){
                //     if(value < 21){
                //         throw new Error('too young!!!');
                //     }
                // }
            }
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
        },
        aboutUser:{
            type: DataTypes.VIRTUAL,
            get(){
                return `${this.username}: is about, ${this.description}`
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate:{
                isEmail: true //built-in validator
                //isIn: ['me@soccer.org', 'me@soccer.com']

                // isIn: {
                //     args: ['me@soccer.org', 'me@soccer.com'],
                //     msg: 'The provided email must be one of the following...'
                // }
            }
        }
    },
    {
        freezeTableName: true, //user instead of users
        timestamps: false, //discard createdAt and updatedAt
        validate: {
            usernamePassMatch(){
                if(this.username === this.password){
                    throw new Error('Password cannot be your username!')
                }else{
                    console.log('success!')
                }
            }
        }
    }
);

User.sync({alter: true}).then((data) => {
    return sequelize.query(`SELECT * FROM user WHERE username LIKE :username`, {
        replacements: {
            username: 'Wi%'
        }
    });
}).then((data) => {
    console.log('data: ', data);
}).catch((err) => {
    console.log('user integration failed', err);
});