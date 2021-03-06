//Подключение к Gulp и взятие из него методов которые будут использоваться в моем проекте
const{src, dest} = require('gulp')
//Конфигурации
const path = require('../config/path.js')
const app = require('../config/app.js')
//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pugs = require('gulp-pug');
const webpHtml = require('gulp-webp-html');

//Обработка Pug
const pug = () => {
   return src(path.pug.src)
      .pipe(plumber({
         errorHandler: notify.onError(error => ({
            title: 'Pug',
            message: error.message
         }))
      }))
      .pipe(pugs({
         pretty: true,
         data: {
            news: require('../data/news.json')  
         }
      }))
      .pipe(pugs(app.pug))
      .pipe(webpHtml())
      .pipe(dest(path.pug.dest))  
}

module.exports = pug