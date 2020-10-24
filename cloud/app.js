const Parse = require('parse/node');

app.get("/", (req, res) => {
    if (req) {
        console.log(req.query.test);
        res.send("req");
    }
    else {
        res.send("Hello my name is bobby");
    }
});

app.post("/", (req, res) => {
    console.log(req);
    res.send("login");
});

console.log("Hello world") 