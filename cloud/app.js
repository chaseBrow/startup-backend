const Parse = require('parse/node');

app.get("/test", (req, res) => {
    res.json({params: req.query});
});

app.get("/user/create", async (req, res) => {
    if (!req.query.email || !req.query.password) {
        res.json({ sessionId: null, error: "Please provide an email and password"});
    }
    else {
        let newUser = new Parse.User();
        newUser.set("username", req.query.email);
        newUser.set("password", req.query.password);
        newUser.set("email", req.query.email);
        try {
            await newUser.signUp();
        } catch (err) {
            res.json({sessionId: null, error: "Error: " + err.code + " " + err.message});
        }
        res.json({ sessionId: "912jIdm1", error: null});
    }
});


app.get("/user/reset", async (req, res) => {
    try {
        console.log("reseting password for email: " + req.query.email);
        Parse.User.requestPasswordReset(req.query.email)
        .then(() => {}).catch((err) => {
            res.json({msg: "There is no matching email on record.", error: "Error: " + err.code + " " + err.message});
        });
    } catch (err) {
        res.json({msg: "There is no matching email on record.", error: "Error: " + err.code + " " + err.message});
    }
    res.json({msg: "An email has been sent successfully to " + req.query.email, error: null})
});



console.log("Hello world") 