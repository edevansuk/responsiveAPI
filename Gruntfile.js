module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				//mangle: false,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'js/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			//all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
			all: ['Gruntfile.js', 'js/<%= pkg.name %>.js']
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Tasks, by default it validates the JS and then minifies. 
	// What's great is that the minified code doesn\'t work which is a nice feature'
	grunt.registerTask('default', ['jshint', 'uglify']);
	grunt.registerTask('validate', ['jshint']);
};