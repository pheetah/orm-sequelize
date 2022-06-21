const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize('sequelize-assocations', 'root', 'sifre', {
    dialect: 'mysql',
    port: 3305
});

const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const Product = sequelize.define('product', {
    productName: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

Customer.belongsToMany(Product, { 
    through: 'customerproduct'
});
Product.belongsToMany(Customer, { 
    through: 'customerproduct'
});

sequelize.sync({ alter: true }).then(() => {
    
}).catch((err) => {console.log(err)});