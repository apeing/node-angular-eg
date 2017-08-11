var gulp = require('gulp');
var less = require('gulp-less');
var eslint = require('gulp-eslint');
const bower = require('gulp-bower');
const mainFiles = require('main-bower-files');


function compileLess(path){
    var srcPath = 'public/' + path + '/less/**/*.less';
    var destPath = 'public/' + path + '/css';
    gulp.src(srcPath).pipe(less()).pipe(gulp.dest(destPath));
}

gulp.task('less',['blog/','wechat/activity/'].forEach(compileLess));

gulp.task('bower', function() {
    return bower();
});

gulp.task('mainFiles', ['bower'], function() {
    return gulp.src(mainFiles(), {base: 'bower_components'}).pipe(gulp.dest('public/lib'));
});

gulp.task('default', ['mainFiles']);

gulp.task('lint',function(){
    return gulp.src(['public/scripts/*.js','!public/scripts/qupload.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});