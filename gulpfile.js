var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

// scss compiler
gulp.task('sass', function () {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

// es6 compiler
gulp.task('es6', function () {
    return browserify('./app/js/main.js')
        .transform('babelify', {
            presets: ['env']
        })
        .bundle()
        .pipe(source('bundle.js')) // Converts To Vinyl Stream
        .pipe(buffer()) // Converts Vinyl Stream To Vinyl Buffer
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('watch', function () {
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.js', ['es6']);
});

gulp.task('default', ['es6', 'sass', 'watch']);