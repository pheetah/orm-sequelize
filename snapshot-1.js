const Sequelize = require('sequelize');

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

//sequelize.sync({alter:true})
sequelize.drop({ match: /test$/}); // drop tables that and with test


const User = sequelize.define(
    'user',
    {
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.STRING(20)
        },
        age:{
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 18
        }
    },
    {
        freezeTableName: true, //user instead of users
        timestamps: false //discard createdAt and updatedAt
    }
);

//User.drop();


//also sync({alter: true})
User.sync({force: true}).then((data) => {
    console.log('user integration successful', data);
    console.log(sequelize.models.user);
}).catch((err) => {
    console.log('user integration failed', err);
});