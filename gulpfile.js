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
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/img/',
        fonts: 'public/fonts/'
    },
    src: {
        js: ['src/js/**/*.js', '!src/js/modernizr.custom.js'],
        jsModernizr: 'src/js/modernizr.custom.js',
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*',
        spritesStyle: 'src/css/',
        sprites: 'src/img/sprites/*.*',
        fonts: ['src/fonts/**/*.*', './bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eot,otf,svg}']
    },
    watch: {
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        sprites: 'src/img/sprites/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './public'
};

// gulp.task('webserver', () => {
//     browserSync({
//         server: "./public"
//     }, (err, bs) => {
//         ngrok.connect(bs.options.get('port'), (err, url) => {});
//     });
// });

gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});

gulp.task('sprites:build', () => {
    let spritesData = gulp.src(path.src.sprites)
        .pipe(spritesmith({
            imgName: '../img/sprites.png',
            cssName: '_sprites.scss',
            cssFormat: 'scss',
            algorithm: 'binary-tree',
            /*cssVarMap: (sprites) => {
             sprites.name = 's-' + sprites.name
             }*/
        }));

    spritesData.img.pipe(gulp.dest(path.build.img));
    spritesData.css.pipe(gulp.dest(path.src.spritesStyle));
});

gulp.task('image:build', () => {
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

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('js:build', () => {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:build:modernizr', () => {
    return gulp.src(path.src.jsModernizr)
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', () => {
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

let bower = (path) => {
    return 'bower_components/' + path;
};

gulp.task('concatPlug:css', () => {
    return gulp.src([
        bower('normalize-css/normalize.css'),
        bower('font-awesome/css/font-awesome.min.css'),
        bower('material-design-iconic-font/dist/css/material-design-iconic-font.min.css'),
        bower('owl.carousel/dist/assets/owl.carousel.min.css'),
        bower('magnific-popup/dist/magnific-popup.css'),
        bower('DirectionAwareHoverEffect/css/style.css'),
        bower('toastr/toastr.min.css')
    ])
        .pipe(concat('components.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('concatPlug:js', () => {
    return gulp.src([
        // 'bower_components/jquery/dist/jquery.min.js',
        bower('bootstrap-sass/assets/javascripts/bootstrap.min.js'),
        bower('owl.carousel/dist/owl.carousel.min.js'),
        bower('magnific-popup/dist/jquery.magnific-popup.min.js'),
        bower('bootstrap-validator/dist/validator.min.js'),
        bower('masonry/dist/masonry.pkgd.min.js'),
        bower('DirectionAwareHoverEffect/js/jquery.hoverdir.js'),
        bower('shufflejs/dist/jquery.shuffle.min.js'),
        bower('imagesloaded/imagesloaded.pkgd.min.js'),
        bower('masonry/dist/masonry.pkgd.min.js'),
        bower('toastr/toastr.min.js')
    ])
        .pipe(concat('components.min.js'))
        .pipe(uglify().on('error', (e) => {
            console.log(e);
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build', [
    'js:build',
    'js:build:modernizr',
    'style:build',
    'fonts:build',
    'sprites:build',
    'image:build',
    'concatPlug:css',
    'concatPlug:js'
]);

gulp.task('watch', () => {
    watch([path.watch.style], (event, cb) => {
        gulp.start('style:build');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('js:build');
    });
    watch([path.watch.sprites], (event, cb) => {
        gulp.start('sprites:build');
    });
    watch([path.watch.img], (event, cb) => {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], (event, cb) => {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'watch']);