module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      options: {
        specs: [
          "spec/jasmine_fake_window_spec.js",
          "spec/jasmine_fake_window_example_spec.js"
        ],
        vendor: "libs/parse_uri.js"
      },
      src: "src/jasmine_fake_window.js"
    },
    jshint: {
      files: ["src/jasmine_fake_window.js", "spec/jasmine_fake_window_spec.js"]
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jasmine", "jshint"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask("dev", ["jshint", "jasmine", "watch"]);
};
