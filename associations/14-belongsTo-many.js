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

User.hasMany(Post); //onDelete: 'CASCADE'
Post.belongsTo(User); //onDelete: 'CASCADE'

let user, posts;

sequelize.sync({alter:true}).then(() => {
    return User.findOne({where: {userName: 'mamadou'}});
}).then((data) => {
    user = data;
    return Post.findOne();
}).then((data) => {
    posts = data;
    //for multiple removal use removePosts()
    posts.setUser(user);
}).catch((err) => {
    console.log(err);
});