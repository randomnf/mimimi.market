'use strict';

const	gulp = require('gulp'),
		fileinclude = require('gulp-file-include'),
		cssmin = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		htmlbeautify = require('gulp-html-beautify'),
		htmlmin = require('gulp-htmlmin'),
		jsmin = require('gulp-jsmin');

gulp.task("html",function(){
	gulp.src('src/html/*.html')
		.pipe(fileinclude({
			context: {
				index: false,
				cart: false
			}
		}))
		.pipe(htmlbeautify({
			"indent_size": 1,
			"indent_char": "	",
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('cssmin', function () {
	return gulp.src('src/css/style.css')
		.pipe(cssmin())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('jsmin', function () {
	return gulp.src('src/js/*.js')
		.pipe(jsmin())
		.pipe(rename({
			suffix:'.min'
		}))
		.pipe(gulp.dest('build/js'));
});

gulp.task("htmlmin",function(){
	gulp.src('src/html/*.html')
		.pipe(fileinclude())
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyJS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.css', ['cssmin']);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/js/*.js', ['jsmin']);
});

gulp.task('default', ['html', 'cssmin', 'jsmin', 'watch']);
