var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.
    var noc = [7511, 7321, 4211];
    var count = 0;

    for(var i = 0; i < noc.length; i++){
    url = 'http://noc.esdc.gc.ca/English/noc/ViewAllTitlesQuickSearch.aspx?ver=16&val65=7511&val=7&val1=' + noc[i];


    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            // console.log(html);
            // console.log($(".NoBulletList").text());
            var list = [];

            $("#form1 .container .row #wb-cont .NoBulletSpacing").children().each(function() { list.push($(this).text());
            count++; });
            // Finally, we'll define the variables we're going to capture

            console.log(noc[count])
            console.log(list)
            console.log("-------------------------------------------")
        }

        res.send('Check your console!')
    })
  }
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
