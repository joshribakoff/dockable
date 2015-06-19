var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less-sourcemap');

gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
        .pipe(less({
            sourceMap: {

            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
    return gulp
        .src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'bower_components/angular/angular.js',
            'src/**/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'template/**/*'], ['scripts', 'less']);
});

gulp.task('default', ['scripts', 'less', 'watch']);