'use strict';

let gulp = require('gulp'),
    //Server
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    ngrok = require('ngrok'),
    //Images
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    //CSS
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    //Other
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    watch = require('gulp-watch');


//=================================================================


let path = {
    build: {
        html: 'public/',
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/img/',
        fonts: 'public/fonts/'
    },
    src: {
        html: 'src/**/*.html',
        jsMain: ['src/js/**/*.js'],
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*',
        spritesStyle: 'src/css/',
        sprites: 'src/img/sprites/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        sprites: 'src/img/sprites/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './public'
};

// gulp.task('webserver', function () {
//     browserSync({
//         server: "./public"
//     }, function (err, bs) {
//         ngrok.connect(bs.options.get('port'), function (err, url) {
//         });
//     });
// });

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('sprites:build', function() {
    let spritesData = gulp.src(path.src.sprites)
        .pipe(spritesmith({
            imgName: '../img/sprites.png',
            cssName: '_sprites.scss',
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            /*cssVarMap: function(sprites) {
             sprites.name = 's-' + sprites.name
             }*/
        }));

    spritesData.img.pipe(gulp.dest(path.build.img));
    spritesData.css.pipe(gulp.dest(path.src.spritesStyle));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.jsMain)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/css/'],
            outputStyle: 'compressed',
            sourceMap: true
        }).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(sourcemaps.write())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('concatPlug:css', function () {
    return gulp.src([
        'bower_components/normalize-css/normalize.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
        'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',
        'bower_components/magnific-popup/dist/magnific-popup.css',
        'bower_components/DirectionAwareHoverEffect/css/style.css'
    ])
        .pipe(concat('components.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('concatPlug:js', function () {
    return gulp.src([
        // 'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'bower_components/owl.carousel/dist/owl.carousel.min.js',
        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
        'bower_components/bootstrap-validator/dist/validator.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js',
        'bower_components/DirectionAwareHoverEffect/js/jquery.hoverdir.js',
        'bower_components/shufflejs/dist/jquery.shuffle.min.js',
        'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
        'bower_components/masonry/dist/masonry.pkgd.min.js'
    ])
        .pipe(concat('components.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'sprites:build',
    'image:build',
    'concatPlug:css',
    'concatPlug:js'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.sprites], function (event, cb) {
        gulp.start('sprites:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'watch']);