class HomeController {
    static index(req, res) {
        res.render("index", { title: "Home Page" });
    }

    static about(req, res) {
        res.send(`<h1> Hello About Page!!</h1>`);
    }
}

module.exports = HomeController