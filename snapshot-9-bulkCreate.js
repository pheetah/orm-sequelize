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
    return User.bulkCreate([
        { 
            username: 'sefe',
            age: 23,
            password: 'pizza' 
        },
        {
            username: 'ssds',
            age: 23,
            password: 'xd' 
        }
    ]);
}).then((datas) => {
    datas.forEach(data => {
        console.log('element: ', data.toJSON());
    })
}).catch((err) => {
    console.log('user integration failed', err);
});