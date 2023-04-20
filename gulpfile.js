const gulp = require('gulp');
var clean = require('gulp-clean');
const less = require('gulp-less');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');


// LESS ----------------------

const lessWatchPath = ['./_src/less/**/*.less','./opencontent/templates/**/*.less'];

function buildLess() { // Parse only the Skin.less file
  // 1. What less files to parse?
  return gulp.src('./_src/less/Skin.less')
  
  // 2. Init Source maps
  .pipe(sourcemaps.init())
  
   // 3. Parse Less
   .pipe(less())  
   
   // 4. Compress CSS
   .pipe(cleanCSS({inline: ['none']}))
   
   // 4. CreateSource maps
   .pipe(sourcemaps.write('./'))
   
   // 5. Where to write the CSS
   .pipe(gulp.dest('./'))
}


// SCSS ----------------------
const skinScssPath = ['./_src/scss/skin.scss'];
const scssWatchPath = ['./_src/**/*.scss'];

function buildScss() { // Parse only the Skin.less file
  // 1. What less files to parse?
  return gulp.src(skinScssPath)
  
 
   // 2. Parse Less
   .pipe(sass.sync().on('error', sass.logError))  
   
   // 3. Write File
   //.pipe(gulp.dest('../skin.css'))
   
   // 4. Compress CSS
   .pipe(cleanCSS({inline: ['none']}))
   
   // 5. Rename to min
   //.pipe(rename({ extname: '.min.css' }))
   
   // 6. Write minified CSS
   .pipe(gulp.dest('./'))
}

// SCSS ----------------------
const containerSource = ['_src/containers/**/*.*'];
const containersTarget = ['../../containers/BS5-Simple-Sidebar/'];


function copyContainers() { // Parse only the Skin.less file

  // 1. clean the DNN Container folder
  gulp.src(containersTarget + '**/*.*', {read: false})
  .pipe(clean({force: true}));
  
  // 2. Get containers
  return gulp.src(containerSource)
  
   // 3. Move to container folder
   .pipe(gulp.dest(containersTarget))  
	;
}







function styleTask(){
	buildLess();
	buildScss();
}


// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    gulp.watch(containerSource, { delay: 1000 }, copyContainers);
    gulp.watch(lessWatchPath, buildLess);
    gulp.watch(scssWatchPath, buildScss);
}

exports.copyContainers = copyContainers;
exports.buildLess = buildLess;
exports.buildScss = buildScss;
exports.style = styleTask;

exports.default = watchTask;

