const express = require("express");
const app = express();

const users = [{
    name: "Pratham",
    kidneys: [{
        healthy: false
    }, {
        healthy: true
    }]
}];

app.use(express.json());

app.get("/", function(req, res) {
    const patientName= users[0].name;
    const prathamKidneys = users[0].kidneys;
    const numberOfKidneys = prathamKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i<prathamKidneys.length; i++) {
        if (prathamKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        patientName,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function(req, res) {
    
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Kidney Added"
    })
})

// 411
app.put("/", function(req, res) {

    if(allAreHealthyKidneys()){
        for (let i = 0; i<users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg: "All Kidneys are healthy Now"
        });
    }
    else {
        res.status(411).json({
            msg: "There's no bad kidney left to make it healthy"
        });
    }
})

// removing all the unhealhty kidneys
app.delete("/", function(req, res) {
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i<users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})   
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}
function allAreHealthyKidneys(){
    let allAreHealthyKidneys= true;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            allAreHealthyKidneys= false;
        }
    }
    return allAreHealthyKidneys;
}
app.listen(3000);