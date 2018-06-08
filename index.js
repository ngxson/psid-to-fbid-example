'use strict'

const PsidToFbid = require('psid-to-fbid');
const request = require('request');
const co = require('./const');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var serviceAccount = require('./firebase_key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: co.FIREBASE_DB_URL
});
var db = admin.database();

// SETUP WITH TOKEN AND PAGE ID
PsidToFbid.init(co.PAGE_ID,
        co.ACCESS_TOKEN,
        {cache_enable: true})
.then(() => {
    console.log("PsidToFbid: Setup complete");
}).catch(() => {
    console.log("PsidToFbid: Setup failed");
})

app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === co.WEBHOOK_VERIFY_TOKEN) {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong token');
	}
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i];
        let psid = event.sender.id;
        PsidToFbid.getFromWebhookEvent(event).then(fbid => {
            // SAVE FBID TO DATABASE
            if (fbid) db.ref("psid/"+psid).set(fbid);
        })
    }
    res.sendStatus(200);
})

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
