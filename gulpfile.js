var gulp = require('gulp');
var less = require('gulp-less');
const bower = require('gulp-bower');
const mainFiles = require('main-bower-files');

function compileLess(path){
    var srcPath = 'public/' + path + '/less/**/*.less';
    var destPath = 'public/' + path + '/css';
    gulp.src(srcPath).pipe(less()).pipe(gulp.dest(destPath));
}

gulp.task('less',['blog/'].forEach(compileLess));

gulp.task('bower', function() {
    return bower();
});

gulp.task('mainFiles', ['bower'], function() {
    return gulp.src(mainFiles(), {base: 'bower_components'}).pipe(gulp.dest('public/lib'));
});

gulp.task('default', ['mainFiles']);