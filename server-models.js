var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


exports.accomplishment = {
    schema: new Schema({
        title: String,
        date: String,
        details: String
    },{
        collection : 'accomplishments'
    })
}

mongoose.model('Accomplishment', exports.accomplishment.schema);

exports.position = {
    schema: new Schema({
        title: String,
        date: String,
        details: String
    },{
        collection : 'positions'
    })
}

mongoose.model('Position', exports.position.schema);
