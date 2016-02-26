### The following gulpfile compiles coffeescript and places it in the build folder along with minified game assets. ###

### Gulp and processing plugins. ###
gulp       = require('gulp')
gutil      = require('gulp-util')
coffee     = require('gulp-coffee')
concat     = require('gulp-concat')
sass       = require('gulp-sass')
changed    = require('gulp-changed')
imagemin   = require('gulp-imagemin')
minifyHTML = require('gulp-minify-html')

### Source and build destination directories for files. ###
# The conatenation order of javascript files is important. Otherwise there will be errors
coffeeSrc = [
  './src/script/*State.coffee',
  './src/script/main.coffee',
  './src/script/Powerup.coffee',
  './src/script/*.coffee'
]
coffeeDst = './build/script'
libSrc = './src/lib/*.js'
libDst = './build/lib'
imgSrc = './src/img/*'
imgDst = './build/img'
fontsSrc = './src/fonts/*'
fontsDst = './build/fonts'
htmlSrc = './src/*.html'
htmlDst = './build/'
styleSrc = './src/styles/*.scss'
styleDst = './build/css'

# Build CoffeeScript files
gulp.task 'coffee', ->
  gulp.src(coffeeSrc).pipe(concat('main.coffee')).pipe(coffee(bare: true).on('error', gutil.log)).pipe gulp.dest(coffeeDst)
  return

# Copy JavaScript libraries
gulp.task 'lib', ->
  gulp.src(libSrc).pipe gulp.dest(libDst)
  return

# Copy image files
gulp.task 'img', ->
  gulp.src(imgSrc).pipe gulp.dest(imgDst)
  return

# Copy fonts
gulp.task 'fonts', ->
  gulp.src(fontsSrc).pipe gulp.dest(fontsDst)
  return

# Copy html files
gulp.task 'html', ->
  gulp.src(htmlSrc).pipe(minifyHTML()).pipe gulp.dest(htmlDst)
  gulp.src('./src/favicon/*').pipe gulp.dest('./build')
  return

# Build stylesheet files
gulp.task 'style', ->
  gulp.src(styleSrc).pipe(sass()).pipe gulp.dest(styleDst)
  return

# Default task (this is run when you type 'gulp' in the root directory)
gulp.task 'default', [
  'coffee'
  'lib'
  'img'
  'html'
  'style'
  'fonts'
], ->
  # watch for changes in CoffeeScript files
  gulp.watch coffeeSrc, [ 'coffee' ]
  # watch for changes in image files
  gulp.watch imgSrc, [ 'img' ]
  # watch for changes in html files
  gulp.watch htmlSrc, [ 'html' ]
  # watch for changes in stylesheets
  gulp.watch styleSrc, [ 'style' ]
  # watch for changes in fonts
  gulp.watch styleSrc, [ 'fonts' ]
  return
