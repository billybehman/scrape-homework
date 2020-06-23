var cheerio = require("cheerio");
var axios = require("axios");
var db = require("../models");


module.exports = function (app) {
    app.get("/scrape", function (req, res) {

        axios.get("https://www.theonion.com/").then(function (response) {

            var $ = cheerio.load(response.data);
            $("article a").each(function (i, element) {

                var result = {};


                result.title = $(this).children("h4").text();

                result.link = $(this).attr("href");


                db.Article.create(result)
                    .then(function (dbArticle) {
                    
                        console.log("this is the article: " + dbArticle);
                    })
                    .catch(function (err) {
                    
                        console.log(err);
                    });
            });


            res.send("scrape finished");
        });
    });


    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {

                res.json(dbArticle);
            })
            .catch(function (err) {
            
                res.json(err);
            });
    });


    app.get("/articles/:id", function (req, res) {

        db.Article.findOne({ _id: req.params.id })

            .populate("note")
            .then(function (dbArticle) {

                res.json(dbArticle);
                console.log(dbArticle)
            })
            .catch(function (err) {

                res.json(err);
            });
    });

    
    app.post("/articles/:id", function (req, res) {
    
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
                console.log(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/articles/:id", function (req, res) {
        db.Note.deleteOne({_id: req.params.id})
        .then(function(data){
            res.json(data)
        })
        .catch(function(err) {
            res.json(err)
        })
    })

    app.delete("/articles-delete", function (req, res) {
        db.Article.deleteMany({})
        .then(function(data){
            res.json(data)
        })
        .catch(function(err) {
            res.json(err)
        })
    })
}
