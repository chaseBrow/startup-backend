/*
Author: Chase Brown
Desc: This is backend for a IOS application which serves to pair students with startups needing
technical assistance.
*/

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

app.put("/user/update/info", async (req, res) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});
    if(req.query.location) {
        user.set("location", req.query.location);
    }
    if(req.query.email) {
        user.set("email", req.query.email);
        user.set("username", req.query.email);
    }
    if(req.query.firstName) {
        user.set("firstName", req.query.firstName);
    }
    if(req.query.lastName) {
        user.set("lastName", req.query.lastName);
    }
    if(req.query.greeting) {
        user.set("greeting", req.query.greeting);
    }
    if(req.query.linkedIn) {
        user.set("linkedIn", req.query.linkedIn);
    }
    if(req.query.github) {
        user.set("github", req.query.github);
    }
    if(req.query.tags) {
        user.set("tags", req.query.tags);
    }
    user.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.put("/user/update/education", async (req, res) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    const Edu = Parse.Object.extend("Education");
    const queryEdu = new Parse.Query(Edu);
    queryEdu.equalTo("owner", user);
    queryEdu.equalTo("college", req.query.college);
    let temp = new Date(req.query.start);
    queryEdu.equalTo("start", temp);
    let edu = await queryEdu.first({useMasterKey: true});
    if(req.query.end) {
        temp = new Date(req.query.end);
        edu.set("end", temp);
    }
    if(req.query.present) {
        if(req.query.present == "true") edu.set("present", true);
        else edu.set("present", false);
    }
    if(req.query.major) {
        edu.set("major", req.query.major);
    }
    if(req.query.minor) {
        edu.set("minor", req.query.minor);
    }
    if(req.query.gpa) {
        edu.set("gpa", req.query.gpa);
    }
    if(req.query.tags) {
        edu.set("tags", req.query.tags);
    }
    edu.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.put("/user/update/experience", async (req, res) => {
    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    const Exp = Parse.Object.extend("Experience");
    const queryExp = new Parse.Query(Exp);
    queryExp.equalTo("owner", user);
    queryExp.equalTo("name", req.query.name);
    let temp = new Date(req.query.start);
    queryExp.equalTo("start", temp);
    let exp = await queryExp.first({useMasterKey: true});
    if(req.query.end) {
        temp = new Date(req.query.end);
        exp.set("end", temp);
    }
    if(req.query.present) {
        if(req.query.present == "true") exp.set("present", true);
        else exp.set("present", false);
    }
    if(req.query.project) {
        if(req.query.project == "true") exp.set("project", true);
        else exp.set("project", false);
    }
    if(req.query.title) {
        exp.set("title", req.query.title);
    }
    if(req.query.description) {
        exp.set("description", req.query.description);
    }
    if(req.query.tags) {
        exp.set("tags", req.query.tags);
    }
    exp.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.get("/listings", async (req, res) => {
    const List = Parse.Object.extend("Listing");
    const queryList = new Parse.Query(List);
    console.log("test1");
    if(req.query.name) {
        queryList.startsWith("name", req.query.name);
    }
    if(req.query.type) {
        queryList.equalTo("type", req.query.type);
    }
    if(req.query.paid) {
        queryList.equalTo("paid", req.query.paid);
    }
    if(req.query.sortBy == "Relevant") {
        //function for collecting tags and comparing here....
    }
    else if(req.query.sortBy == "Newest") {
        queryList.descending("start");
    }
    else if(req.query.sortBy == "Oldest") {
        queryList.ascending("start");
    }
    console.log("test2");

    let list = await queryList.find();
    res.json({listings: list});
});

app.post("/listings/create", async (req, res) => {
    const List = Parse.Object.extend("Listing");
    let newList = new List();

    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    newList.set("name", req.query.name);
    let temp = new Date(req.query.start);
    newList.set("start", temp);
    newList.set("location", req.query.location);
    newList.set("type", req.query.type);
    if(req.query.paid == "true") newList.set("paid", true);
    else newList.set("paid", false);
    newList.set("title", req.query.title);
    newList.set("description", req.query.description);
    newList.set("tags", req.query.tags);
    newList.set("owner", user);
    newList.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});

app.put("/listings/update", async (req, res) => {
    const List = Parse.Object.extend("Listing");
    const queryList = new Parse.Query(List);

    const query = new Parse.Query(Parse.User);
    query.equalTo("objectId", req.query.sessionId);
    let user = await query.first({useMasterKey: true});

    queryList.equalTo("owner", user);
    queryList.equalTo("name", req.query.name);
    queryList.equalTo("title", req.query.title);

    let list = await queryList.first();

    if(req.query.start) {
        let temp = new Date(req.query.start);
        list.set("start", temp);
    }
    if(req.query.location) {
        list.set("location", req.query.location);
    }
    if(req.query.type) {
        list.set("type", req.query.type);
    }
    if(req.query.paid) {
        if(req.query.paid == "true") list.set("paid", true);
        else list.set("paid", false);
    }
    if(req.query.description) {
        list.set("description", req.query.description);
    }
    if(req.query.tags) {
        list.set("tags", req.query.tags);
    }
    
    list.save(null, {useMasterKey: true}).then(() => {
        res.json({error: null});
    }).catch((err)=> {
        res.json({error: err});
    });
});