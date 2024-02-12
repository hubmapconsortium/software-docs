const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const lang = require('./docs/lang/en.json')
const stylus = require('gulp-stylus')
const header = require('gulp-header')
const { exec } = require('child_process')

const pkg = require('./package.json')
const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @date <%= date %>',
    ' */',
    ''
].join('\n')

function js(cb) {
    return gulp
        .src(['node_modules/babel-polyfill/dist/polyfill.js', 'src/js/*.js'])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false
                        }
                    ]
                ]
            })
        )
        .pipe(header(banner, { pkg, date: new Date() }))
        .pipe(gulp.dest('docs/js'))
}

gulp.task('js', js)

const locals = {
    _m: lang,
    _t: function (s, m) {
        m = m || {}
        return m[s] || s
    }
}

function html() {
    return gulp
        .src(['./src/pug/layouts/*.pug'])
        .pipe(
            pug({
                pretty: true,
                locals
            })
        )
        .pipe(gulp.dest('docs/_layouts/'))
}

gulp.task('html-layouts', html)

function html2() {
    return gulp
        .src(['./src/pug/*.pug'])
        .pipe(
            pug({
                pretty: true,
                locals
            })
        )
        .pipe(gulp.dest('docs/'))
}

gulp.task('html-pages', html2)

function css() {
    return gulp
        .src('./src/styles/main.styl')
        .pipe(
            stylus({
                compress: true
            })
        )
        .pipe(header(banner, { pkg, date: new Date() }))
        .pipe(gulp.dest('docs/css/'))
}

gulp.task('css', css)

function touch() {
    try {
        exec('npm run css', (error, stdout, stderr) => {})
    } catch (e) {}
}

gulp.task('touch', touch)

exports.default = function () {
    gulp.watch('src/pug/**/*.pug', gulp.series(html, html2))
    gulp.watch('src/js/*.js', js)
    gulp.watch('src/styles/**/*.styl', touch)
}
