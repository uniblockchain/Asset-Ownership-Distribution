var gulp = require('gulp')

gulp.task('default', ['copy'])

gulp.task('copy', function () {
  gulp.src('./contracts/*.sol')
    .pipe(gulp.dest('./truffle/contracts'))
})
