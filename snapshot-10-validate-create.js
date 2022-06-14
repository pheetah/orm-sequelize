const Sequelize = require('sequelize');

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
            } //works on create but not bulkCreate!
        },
        password: {
            type: DataTypes.STRING(20)
        },
        age:{
            type: DataTypes.INTEGER,
            defaultValue: 18
        }
    },
    {
        freezeTableName: true, //user instead of users
        timestamps: false //discard createdAt and updatedAt
    }
);

User.sync({alter: true}).then((data) => {
    return User.create(
        {
            username: 'longerthansix',
            age: 23,
            password: 'xd' 
        }
    );
}).then((data) => {
    console.log(data.toJSON())
}).catch((err) => {
    console.log('user integration failed', err);
});