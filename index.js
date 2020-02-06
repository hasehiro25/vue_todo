const app = new Vue({
  el: "#app",
  data: {
    message: "",
    storage: localStorage.getItem("foo"),
    incompletedTasks: [],
    completedTasks: []
  },
  mounted: function() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    this.incompletedTasks = tasks["incompletedTasks"];
    this.completedTasks = tasks["completedTasks"];
  },
  methods: {
    createTask: function() {
      if (this.message == "") return;
      this.incompletedTasks.push(this.message);
      this.saveToStorage();
      this.message = "";
    },
    deleteIncompleteTask: function(index) {
      this.incompletedTasks.splice(index, 1);
      this.saveToStorage();
    },
    clearAllIncompleteTasks: function() {
      this.incompletedTasks = [];
      this.saveToStorage();
    },
    completeTask: function(index) {
      this.completedTasks.push(this.incompletedTasks[index]);
      this.incompletedTasks.splice(index, 1);
      this.saveToStorage();
    },
    clearCompletedTask: function(index) {
      this.completedTasks.splice(index, 1);
      this.saveToStorage();
    },
    undoTask: function(index) {
      this.incompletedTasks.push(this.completedTasks[index]);
      this.completedTasks.splice(index, 1);
      this.saveToStorage();
    },
    clearAllCompletedTasks: function() {
      this.completedTasks = [];
      this.saveToStorage();
    },
    saveToStorage: function() {
      const tasks = {
        incompletedTasks: this.incompletedTasks,
        completedTasks: this.completedTasks
      };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});
