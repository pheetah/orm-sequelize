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

const CustomerProduct = sequelize.define('customerproduct', {
    customerProductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
});

Customer.belongsToMany(Product, { 
    through: CustomerProduct
});
Product.belongsToMany(Customer, { 
    through: CustomerProduct
});


let customer, product;

sequelize.sync({ alter: true }).then(() => {
    return Customer.destroy({ where: {customerName: 'mamadou'}});
}).then((data) => {
    console.log(data);
}).catch((err) => {console.log(err)});