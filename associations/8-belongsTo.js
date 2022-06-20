const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize('sequelize-assocations', 'root', 'sifre', {
    dialect: 'mysql',
    port: 3305
});

const Country = sequelize.define('country', {
        countryName: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false    
    }
);

const Capital = sequelize.define('capital', {
        capitalName: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false    
    }    
)

Country.hasOne(Capital);
Capital.belongsTo(Country);

let country, capital;

sequelize.sync({alter: true}).then(() => {
    return Country.findOne({
        where: {
            countryName: 'Greece'
        }
    })
}).then((data) => {
    country = data;
    return Capital.findOne({
        where: {
            capitalName: 'Athens'
        }
    });
}).then((data) => {
    capital = data;
    capital.setCountry(country);
}).catch((err) => {
    console.log('error occured: ', err)
})