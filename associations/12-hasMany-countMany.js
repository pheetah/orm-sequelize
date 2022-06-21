const Sequelize = require('sequelize');
const {DataTypes, Op} = Sequelize;

const sequelize = new Sequelize('sequelize-assocations', 'root', 'sifre', {
    dialect: 'mysql',
    port: 3305
});

const User = sequelize.define('user', {
    userName: DataTypes.STRING
}, {
    timestamps: false
});

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

User.hasMany(Post);
Post.belongsTo(User);

let user, posts;

sequelize.sync({alter:true}).then(() => {
    return User.findOne({where: {userName: 'john'}});
}).then((data) => {
    user = data;
    return user.countPosts();
}).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});