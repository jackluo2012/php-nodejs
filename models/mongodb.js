var settings = require('../config/settings'),
mongoose = require('mongoose');
mongoose.connect('mongodb://'+settings.host+'/' + settings.db);
module.exports=mongoose;
