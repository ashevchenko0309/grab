var request = require("request"),
    cheerio = require("cheerio"),
    fs = require("fs"),
    url = "https://novostroyki.lun.ua/%D0%B2%D1%81%D0%B5-%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8-%D0%BA%D0%B8%D0%B5%D0%B2%D0%B0";
var START_URL = "https://novostroyki.lun.ua";
var QUERY_PAGE = '?page=';

var START_PAGE = 1;
var END_PAGE = 10;
var RESULT = [];

for(var i = START_PAGE; i <= END_PAGE; i++){
    request(url + QUERY_PAGE + i, function (error, response, body) {

        if (error) {
            console.log("Не удалось получить страницу из за следующей ошибки: " + error);
            return;
        }

        var $ = cheerio.load(body),
            links = $("a.card-media")

        links.each(function (i, link){
            var url = $(link).attr('href');
            url = START_URL + url;
            RESULT.push(url);
        })
        writeFileResult(RESULT);
    });
}

function writeFileResult(result) {
    fs.writeFileSync('result.txt', result);
}