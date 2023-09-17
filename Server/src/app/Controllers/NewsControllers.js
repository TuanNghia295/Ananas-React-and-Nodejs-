class NewsControllers {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug
    // :slug là các biến động vd: news/hot-news, news/top-news
    hotNews(req, res) {
        res.send('hot-news');
    }
}

module.exports = new NewsControllers();
