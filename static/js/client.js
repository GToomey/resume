var ClientApp = Ember.Application.create({
    isLoggedIn: true
});

ClientApp.ModalView = Ember.View.extend({
    template: Ember.Handlebars.compile($('#template-modal').html()),
    
    subView: null,
    
    centerMe: function() {
        var top = ($(window).height() - $('#modal').outerHeight()) / 2;
        var left = ($(window).width() - $('#modal').outerWidth()) / 2;
        
        $('#modal').css({position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
    },
    
    show: function() {
        this.centerMe();
        $('#modal').fadeIn('slow', function() {
            // Animation complete
        });
    },
    
    hide: function() {
        var that = this;
        $('#modal').fadeOut('slow', function() {
            // Animation complete
            that.get('subView').remove();
        });
    }
});

ClientApp.MainView = Ember.View.create({
    template: Ember.Handlebars.compile($('#template-main').html()),
    
    modal: ClientApp.ModalView.create(),
    
    init: function() {
        this._super();
        this.appendTo('#application-container');
        this.get('modal').appendTo('#application-container');
    }
});

ClientApp.PositionModel = Ember.Object.extend({

    url: '/positions',

    _id: null,
    title: null,
    date: null,
    
    isNew: true,
    isDirty: false,
    
    dirtyCheck: function() {
        this.set('isDirty', true);
    }.observes('title', 'date'),
    
    valuesToString: function() {
    
        var ret = {};

        ret.title = this.get('title');
        ret.date = this.get('date');
        
        return ret;

    }.property(),
    
    resetState: function() {
        this.set('isNew', false);
        this.set('isDirty', false);
    },
    
    save: function(){
        var method = null,
            that = this,
            url = this.get('url');
        
        if(this.get('isNew') && this.get('_id') === null){
            method = 'POST';
        } else if (this.get('isDirty')) {
            method = 'PUT';
            url = url + '/' + this.get('_id');
        }

        $.ajax({
            type: method,
            url: url,
            data: this.get('valuesToString'),
            dataType: 'json',
            success: function(response){
                if(that.get('isNew')) {
                    that.set('id', response._id);
                }
            }
        });
        
        this.resetState();
        return true;
    },
    
    destroy: function() {
        
        $.ajax({
            type: 'DELETE',
            url: this.get('url') + '/' + this.get('_id'),
            data: this.get('valuesToString'),
            dataType: 'json',
            success: function(response){
                return true;
            }
        });
        
        return true;
    }
});

ClientApp.PositionController = Ember.ArrayController.create({
    content: [],
    
    editor: null,
    editingModel: null,

    init: function () {
        this._super();
        var that = this;
        this.set('content', []);
    
        $.ajax({
            type: 'GET',
            url: '/positions',
            dataType: 'json',
            success: function(response){
                response.forEach(function(position) {
                    var model = ClientApp.PositionModel.create(position);
                    model.set('isNew', false);
                    that.pushObject(model);
                }, this);
            }
        });
        
    },
    
    addOne: function(){
        var model = this.get('editingModel'),
            state = model.get('isNew');
        
        if(model.save()) {
            if(state) {
                this.pushObject(model);
            }
        }
        this.set('editingModel', null);
        return true;
    },
    
    loadEditor: function() {
        var that = this,
            editor = ClientApp.Editor.create();

        this.set('editor', editor);
        editor.set('content', this.get('editingModel'));
        editor.set('controller', this);
        editor.set('template', Ember.Handlebars.compile($('#template-editor-position').html()));
        editor.appendTo('#modal-content');
        ClientApp.MainView.get('modal').set('subView', editor);
        ClientApp.MainView.get('modal').show();
    },
    
    create: function() {
        this.set('editingModel', ClientApp.PositionModel.create());
        this.loadEditor();
    },
    
    edit: function(event) {
        this.set('editingModel', event.context.content);
        this.get('editingModel').set('isNew', false);
        this.loadEditor();
    },
    
    remove: function(event) {
        this.set('editingModel', event.context.content);
        var id = this.get('editingModel').get('_id');
        if(this.get('editingModel').destroy()) {
            var obj = this.findProperty('_id', id);
            this.removeObject(obj);
            this.set('editingModel', null);
        }
    }
    
});

ClientApp.PositionListView = Ember.CollectionView.extend({

    contentBinding: 'ClientApp.PositionController.content',

    itemViewClass: Ember.View.extend({
        template: Ember.Handlebars.compile($('#template-position').html())
    })
});


ClientApp.AccomplishmentModel = Ember.Object.extend({});

ClientApp.AccomplishmentController = Ember.ArrayController.extend({
    content: [],

    init: function () {
        this._super();
        var that = this;
        this.set('content', []);
    
        $.ajax({
            url: '/accomplishments',
            dataType: 'json',
            success: function(response){
                response.forEach(function(accomplishment) {
                    that.pushObject(ClientApp.AccomplishmentModel.create(accomplishment));
                }, this);
            }
        });
    }
});

ClientApp.AccomplishmentListView = Ember.CollectionView.extend({

    contentBinding: 'ClientApp.AccomplishmentController.content',

    itemViewClass: Ember.View.extend({
        template: Ember.Handlebars.compile($('#template-accomplishment').html())
    })
});


ClientApp.Editor = Ember.View.extend({
    content: null,
    //template: null,
    controller: null,

    presave: function() {
        // validate the fields here

        if(this.get('controller').addOne()) {
            this.postsave();
        }
    },
    
    postsave: function() {
        this.set('content', null);
        ClientApp.MainView.get('modal').hide();
    },
    
    cancel: function() {
        this.set('content', null);
        ClientApp.MainView.get('modal').hide();
    }
});
