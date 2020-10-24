const Parse = require('parse/node');

app.get("/", (req, res) => {
    if (req) {
        res.send("heard you loud and clear");
    }
    else {
        res.send("Hello my name is bobby");
    }
});
console.log("Hello world") 