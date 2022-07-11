//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

//Конфигурация
const path = require('./config/path.js')

// Задачи
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const scss = require('./task/scss.js')
const js = require('./task/js.js')
const img = require('./task/img.js')
const font = require('./task/font.js')

//Сервер
const server = () => {
   browserSync.init({
      server: {
         baseDir: path.root
      }
   })
}

//Наблюдение
const watcher = () => {
   watch(path.pug.watch, pug).on('all', browserSync.reload)
   watch(path.scss.watch, scss).on('all', browserSync.reload)
   watch(path.js.watch, js).on('all', browserSync.reload)
   watch(path.img.watch, js).on('all', browserSync.reload)
   watch(path.font.watch, js).on('all', browserSync.reload)
}

//ЗаДачи
exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;



//Сборка
exports.dev = series(
   clear,
   pug,
   parallel(pug, scss, js, img, font),
   parallel(watcher, server)
)