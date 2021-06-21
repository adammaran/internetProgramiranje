const mongoose = require('mongoose');
const { MONGODB_URL } = require('../utils/constants');

mongoose.connect(MONGODB_URL, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
});