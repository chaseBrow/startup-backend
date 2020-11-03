const Parse = require('parse/node');

app.get("/test", (req, res) => {
    res.json({params: req.query});
});

app.post("/user/create", async (req, res) => {
    if (!req.query.email || !req.query.password) {
        res.json({ sessionId: null, error: "Please provide an email and password"});
    }
    else if (!req.query.firstName || !req.query.lastName) {
        res.json({ sessionId: null, error: "Please provide a first and last name"});
    }
    else {
        let newUser = new Parse.User();
        newUser.set("username", req.query.email);
        newUser.set("password", req.query.password);
        newUser.set("email", req.query.email);
        newUser.set("firstName", req.query.firstName);
        newUser.set("lastName", req.query.lastName);
        if(req.query.type == "true") newUser.set("type", true);
        else newUser.set("type", false);
        try {
            await newUser.signUp();
        } catch (err) {
            res.json({sessionId: null, error: "Error: " + err.code + " " + err.message});
        }
        const user = await Parse.User.logIn(req.query.email, req.query.password);
        res.json({sessionId: user.id, error: null});
    }
});

app.post("/user/onboard/info", async (req, res) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    user.set("location", req.query.location);
    user.set("greeting", req.query.greeting);
    user.set("linkedIn", req.query.linkedIn);
    user.set("github", req.query.github);
    user.set("tags", req.query.tags);
    user.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.post("/user/onboard/education", async (req, res) => {
    let Edu = Parse.Object.extend("Education");
    let newEdu = new Edu();

    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    newEdu.set("college", req.query.college);
    let temp = new Date(req.query.start);
    newEdu.set("start", temp);
    if(req.query.end) {
        temp = new Date(req.query.end);
        newEdu.set("end", temp);
    }
    if(req.query.present == "true") newEdu.set("present", true);
    else newEdu.set("present", false);
    newEdu.set("major", req.query.major);
    newEdu.set("minor", req.query.minor);
    newEdu.set("gpa", req.query.gpa);
    newEdu.set("tags", req.query.tags);
    newEdu.set("owner", user);

    newEdu.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.post("/user/onboard/experience", async (req, res) => {
    let Exp = Parse.Object.extend("Experience");
    let newExp = new Exp();

    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    newExp.set("name", req.query.name);
    let temp = new Date(req.query.start);
    newExp.set("start", temp);
    if(req.query.end) {
        temp = new Date(req.query.end);
        newExp.set("end", temp);
    }
    if(req.query.present == "true") newExp.set("present", true);
    else newExp.set("present", false);
    if(req.query.project == "true") newExp.set("project", true);
    else newExp.set("project", false);
    newExp.set("title", req.query.title);
    newExp.set("description", req.query.description);
    newExp.set("tags", req.query.tags);
    newExp.set("owner", user);

    newExp.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
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