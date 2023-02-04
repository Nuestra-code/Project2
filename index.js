const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const cors = require ('cors');

const userRoutes = require ('./routes/userRoutes');
const productRoutes = require ('./routes/itemRoutes');
const cartRoutes = require ('./routes/cartRoutes');

mongoose.connect('mongodb+srv://Nuestram21:Jtgs02211908@clusternuestra21.bjctsjs.mongodb.net/?retryWrites=true&w=majority', 
{useNewUrlParser:true, useUnifiedTOpology:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => console.log("Connected to database"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use (cors());

app.use('/dnj/users', userRoutes);
app.use('/dnj/products', itemRoutes);
app.use('/dnj/products', cartRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));