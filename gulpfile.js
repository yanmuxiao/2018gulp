let gulp = require('gulp'),
  connect = require('gulp-connect'), // 热加载，和browser-sync一样
  proxy = require('http-proxy-middleware'); // 设置代理

let sass = require('gulp-sass'); // 需要结合node-sass
let useref = require('gulp-useref'); 
let gulpIf = require('gulp-if');
let cleanCss = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let imageMin = require('gulp-imagemin');// 很奇怪，使用gulp-imagemin会报错，可能是gulp版本问题
let cache = require('gulp-cache');


let minifycss=require('gulp-minify-css'),   //css压缩
    concat=require('gulp-concat'),   //合并文件
    uglify=require('gulp-uglify'),   //js压缩
    rename=require('gulp-rename'),   //文件重命名
    // jshint=require('gulp-jshint'),   //js检查
    notify=require('gulp-notify'),   //提示
    clean = require('gulp-clean');


// let path = './app/MVCRequireJS'; // 项目路径
// let path = './app/test'; // 项目路径
//let path = './app/mobileWebUtil'; // 项目路径
let path = './app/adminLayout'; // 项目路径
 
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    host: '192.168.0.100',
    port: 2018,
    livereload: true,
    // middleware: function (connect, opt) {
    //     return [
    //         proxy('/api', {
    //             target: 'http://localhost:8050',
    //             changeOrigin:true
    //         }),
    //         proxy('/product', {
    //             target: 'http://172.16.1.60:8080',
    //             changeOrigin:true
    //         }),
    //         proxy('/bpauth', {
    //             target: 'http://192.168.24.77:8080',
    //             changeOrigin:true
    //         })
    //     ]
    // }
  });
});
 
gulp.task('html', function () {
  gulp.src(path + '/*.html')
    .pipe(connect.reload());
});
gulp.task('stylus', function () {
  gulp.src(path + '/css/*.css')
    .pipe(connect.reload());
});
gulp.task('js', function () {
  gulp.src(path + '/js/*.js')
    .pipe(connect.reload());
});
// Gulp执行预处理==>使用gulp-sass插件来编译Sass。
gulp.task('sass', function() {
 return gulp.src(path + '/scss/*.scss')
   .pipe(sass())
   .pipe(autoprefixer({
        // browsers: ['last 2 versions'],
        browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'],
        cascade: false
    }))
   .pipe(gulp.dest(path + '/css'));
})

 
gulp.task('watch', function () {
  gulp.watch([path + '/*.html'], ['html']);
  gulp.watch([path + '/css/*.css'], ['stylus']);
  gulp.watch([path + '/js/*.js'], ['js']);
  gulp.watch([path + '/scss/*.scss'], ['sass']);
});
 
gulp.task('default', ['connect', 'watch']);








// 打包操作
gulp.task('clean', function() {
  return gulp.src(path + '/dist')
    .pipe(clean())
})

gulp.task('userefHtml', function() {
  return gulp.src(path + '/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', minifycss()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest(path + '/dist'));
});
gulp.task('userefFonts', function() {
  return gulp.src(path + '/fonts/*')
    .pipe(gulp.dest(path + '/dist/fonts'));
});

// 优化图片
gulp.task('imagesCache', function(){
  return gulp.src(path + '/images/*.+(png|jpg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imageMin({
      interlaced: true
    })))
  .pipe(gulp.dest(path + '/dist/images'))
});




// 迁移js和css到一个文件内
gulp.task('userefCss', function() {
  return gulp.src([path + '/css/normalize.css', path + '/css/rem.css'])
    .pipe(gulp.dest(path + '/dist/css'));
});
gulp.task('userefJs', function() {
  return gulp.src([path + '/js/calendar.js', path + '/js/jquery-2.0.3.min.js'])
    .pipe(gulp.dest(path + '/dist/js'));
});




// gulp.task('minitycss', function() {
//   return gulp.src(path + '/css/*.minity.css')
//     .pipe(concat('main.css'))             //合并css
//     .pipe(gulp.dest(path + '/dist/css'))  //输出
//     .pipe(rename({suffix:'.min'}))        //重命名
//     .pipe(minifycss())                    //压缩
//     .pipe(gulp.dest(path + '/dist/css'))  //输出 
//     .pipe(notify({message:"css task ok"}));    //提示
// });
// gulp.task('minityjs', function() {
//   return gulp.src(path + '/js/*.minity.js')
//     .pipe(concat('main.js'))            //合并js
//     .pipe(gulp.dest(path + '/dist/js')) //输出
//     .pipe(rename({suffix:'.min'}))      //重命名
//     .pipe(uglify())                     //压缩
//     .pipe(gulp.dest(path + '/dist/js')) //输出 
//     .pipe(notify({message:"js task ok"}));    //提示
// });

gulp.task('minity', ['clean'], function() {
    gulp.start('userefCss', 'userefJs', 'userefFonts', 'userefHtml');
});