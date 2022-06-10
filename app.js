require('dotenv').config();
const express = require('express');
const db = require('./models');
const server_port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept, X-Requested-With"
    );
    
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


require('./routes/user.router')(app);
require('./routes/article.router')(app);
require('./routes/profile.router')(app);
require('./routes/comment.router')(app);

db.mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`).then(() => {
    console.log(`Successfully connected to MongoDB port: ${process.env.MONGO_PORT}`)
}).catch((err) => console.log(`Failed connected to MongoDB port: ${process.env.MONGO_PORT}`, err));


app.listen(server_port, () => {
    console.log('Server running on port: ' + server_port);
});