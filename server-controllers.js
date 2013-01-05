// server side controller

var mongoose = require('mongoose'),
    Accomplishment = mongoose.model('Accomplishment'),
    Position = mongoose.model('Position');

// "Postions" controller and actions

exports.positions = {
    index: function(request, response) {
        var Position = mongoose.model('Position');
        Position.find(function(error, positions){
            response.send(positions);
        });
    },
    
    create: function(request, response) {
        var document = new Position(request.body);
        document.save(function (error, data) {
            if(error) {
                response.json(error);
            } else {
                response.json(data);
            }
        });
    },
    
    read: function(request, response) {
        response.send('loading view action for request ID #' + request.params.id);
    },
    
    update: function(request, response) {
        var document = Position.findOne({_id: request.params.id}, function(error, data) {
            if(error) {
                response.json(error);
            } else {
                document.update(request.body, function(error, result) {
                    if(error) {
                        response.json(error);
                    } else {
                        response.json(result);
                    }
                });
            }
        });
    },
    
    delete: function(request, response){
        var document = Position.findOne({_id: request.params.id}, function(error, data) {
            if(error) {
                response.json(error);
            } else {
                data.remove();
                response.json(data);
            }
        });
        
    }
    
}

// "Accomplishments" controller and actions

exports.accomplishments = {
    index: function(request, response) {
        if (typeof request !== 'object' || typeof response !== 'object') {
            throw new Error("Invalid request or response");
        }
        var Accomplishment = mongoose.model('Accomplishment');
        Accomplishment.find(function(error, accomplishments){
            response.send(accomplishments);
        });
    },
    
    read: function(request, response) {
        var Accomplishment = mongoose.model('Accomplishment');
        Accomplishment.find({_id: request.params.id}, function(error, accomplishment){
            response.send(accomplishment);
        });
    }
    
}
