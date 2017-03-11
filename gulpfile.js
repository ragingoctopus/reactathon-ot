const gulp = require('gulp');
const del = require('del');

gulp.task('copy', () => {
  const folders = ['src/*.html'];
  // folders.map(function(folder) {
  //  return gulp.src(folder)
  //             .pipe(gulp.dest('./dist/'));
  gulp.src(folders[0])
      .pipe(gulp.dest('./dist/'));

  // gulp.src(folders[2])
  //     .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', () => {
  return del.sync([
    './dist/**',
  ]);
});

gulp.task('build', ['clean', 'copy']);