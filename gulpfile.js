var gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

exports.default = function() {
  return gulp.src(
    [
      'src/utils.scss',
      'src/queries.scss',
      'src/react.scss',
      'src/resp.scss',
      'src/fluid.scss'
    ])
    .pipe(plugins.concat('index.scss'))
    .pipe(gulp.dest('dist/'))
}