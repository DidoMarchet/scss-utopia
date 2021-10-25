var gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

exports.default = function() {
  return gulp.src(
    [
      'node_modules/sass-unitconverter/_unitconverter.scss',
      'src/queries.scss',
      'src/utils.scss',
      'src/react.scss',
      'src/resp.scss',
      'src/fluid.scss',
      'src/slope.scss'
    ])
    .pipe(plugins.concat('index.scss'))
    .pipe(gulp.dest('dist/'))
}