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

sequelize.sync({alter: true}).then(() => {
    Country.bulkCreate([
        {
            countryName: 'Turkiye'
        },
        {
            countryName: 'Spain'
        },
        {
            countryName: 'Greece'
        },
        {
            countryName: 'Germany'
        }
    ]);

    Capital.bulkCreate([
        {
            capitalName: 'Ankara'
        },
        {
            capitalName: 'Madrid'
        },        {
            capitalName: 'Athens'
        },        {
            capitalName: 'Berlin'
        }
    ]);
}).catch((err) => {
    console.log('error occured: ', err)
})