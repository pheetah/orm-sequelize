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

let country, capital;

sequelize.sync({alter: true}).then(() => {
    return Capital.findOne({ where: { capitalName: 'Madrid' } });
}).then((data) => {
    capital = data;
    return Country.findOne({ where: { countryName: 'Spain' } })
}).then((data) => {
    country = data;
    country.setCapital(capital);
}).catch((err) => {
    console.log('error occured: ', err)
})