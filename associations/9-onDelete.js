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

Country.hasOne(Capital, { onDelete: 'CASCADE' } );
Capital.belongsTo(Country, { onDelete: 'CASCADE' } );

let country, capital;

sequelize.sync({alter: true}).then(() => {
    return Country.destroy({
        where: {
            countryName: 'Greece'
        }
    })
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log('error occured: ', err)
})