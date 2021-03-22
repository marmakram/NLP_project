const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

var https = require('follow-redirects').https;

const app = express()

var cors = require('cors')
// Configure express to use body-parser as middle-ware.
// parse application/json
var jsonParser = bodyParser.json()

app.use(cors())
app.use(express.static('dist'))//  Configure express static directory.


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// INFO: a route that handling post request for new URL that coming from the frontend
app.post('/getURLInfo', jsonParser, async (req, response) => {
    try {
        var req = https.request({
            'method': 'POST',
            'hostname': process.env.BASE_URL,
            'path': `/sentiment-2.1?key=${process.env.MEAN_CLOUD_API_KEY}&of=json&url=${req.body.url}&lang=en`,//'/sentiment-2.1?key=<your_key>&lang=<lang>&txt=<text>&model=<model>',
            'headers': {
            },
            'maxRedirects': 20
        }, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                var responseNlp=JSON.parse(body.toString());
                if(!responseNlp || responseNlp.sentence_list == null) {
                    response.send(null); 
                    return;
                }
                debugger;
                var st =responseNlp.sentence_list[0];
                response.status(200).send({
                    text: st.text,
                    score_tag : st.score_tag,
                    agreement : st.agreement,
                    subjectivity : responseNlp.subjectivity,
                    confidence : st.confidence,
                    irony : responseNlp.irony
                });
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        req.end();
        
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
});

//  export app to use it in the unit testing
module.exports= app;