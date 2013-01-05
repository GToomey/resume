 var models = require('../server-models'),
    position_controller = require('../server-controller').positions,
    accomplishment_controller = require('../server-controller').accomplishments;

// Positions Controller tests
  
exports['"Positions" controller has proper actions'] = function(test){

    test.ok(position_controller.index !== 'undefined', '"Index" action is missing');
    test.ok(position_controller.create !== 'undefined', '"Create" action is missing');
    test.ok(position_controller.read !== 'undefined', '"Read" action is missing');
    test.ok(position_controller.update !== 'undefined', '"Update" action is missing');
    test.ok(position_controller.delete !== 'undefined', '"Delete" action is missing');
    
    test.ok(typeof position_controller.index === 'function', '"Index" action is not a function');
    test.ok(typeof position_controller.create === 'function', '"Create" action is not a function');
    test.ok(typeof position_controller.read === 'function', '"Read" action is not a function');
    test.ok(typeof position_controller.update === 'function', '"Update" action is not a function');
    test.ok(typeof position_controller.delete === 'function', '"Delete" action is not a function');
    
    test.done();
};

exports['"Positions" controller only has expected number of actions'] = function(test){
    
    test.ok(Object.keys(position_controller).length === 5, '"Positions" controller does not have the proper number of actions');
    
    test.done();
};

// Accomplishments Controller tests
/*
exports['"Accomplishments" controller has proper actions'] = function(test){

    test.ok(accomplishment_controller.index !== 'undefined', '"Index" action is missing');
    test.ok(accomplishment_controller.create !== 'undefined', '"Create" action is missing');
    test.ok(accomplishment_controller.read !== 'undefined', '"Read" action is missing');
    test.ok(accomplishment_controller.update !== 'undefined', '"Update" action is missing');
    test.ok(accomplishment_controller.delete !== 'undefined', '"Delete" action is missing');
    
    test.ok(typeof accomplishment_controller.index === 'function', '"Index" action is not a function');
    test.ok(typeof accomplishment_controller.create === 'function', '"Create" action is not a function');
    test.ok(typeof accomplishment_controller.read === 'function', '"Read" action is not a function');
    test.ok(typeof accomplishment_controller.update === 'function', '"Update" action is not a function');
    test.ok(typeof accomplishment_controller.delete === 'function', '"Delete" action is not a function');
    
    test.done();
};

exports['"Accomplishments" controller only has expected number of actions'] = function(test){
    
    test.ok(Object.keys(accomplishment_controller).length === 5, '"Accomplishments" controller does not have the proper number of actions');
    
    test.done();
};
*/

