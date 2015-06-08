Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {
        sort: {
          when: 1
        }
      });
    }
  });

  Template.task.events({
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });

  Template.body.events({
    "click #run": function() {
      var tasks = Tasks.find({}, {
        sort: {
          when: 1
        }
      });

      tasks.forEach(function(task) {
        setTimeout(function() {
          $(".scheduler").prepend('<div class="alert" role="alert"><strong class="lead">' + task.text + '</strong></div>');
          $(".scheduler div").removeClass('alert-danger', 100, "easeOutBounce");
          $(".scheduler div:first").addClass('alert-danger', 500, "easeOutBounce");
        }, parseInt(task.when) * 1000);
      });

    },

    "submit .new-task": function(event) {

      var text = event.target.text.value;
      var when = event.target.when.value;

      Tasks.insert({
        text: text,
        when: parseInt(when)
      });

      event.target.text.value = "";
      event.target.when.value = "";

      return false;
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function() {});
}
