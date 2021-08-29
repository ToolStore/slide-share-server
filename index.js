const express = require('express');
const bodeParser = require('body-parser');
var cors = require('cors')
let axios = require('axios')
const { imageToBase64 } = require('@legend80s/image-to-base64');




const app = express();
app.use(cors())
app.use(bodeParser.json({ limit: '5000kb' }))

app.post('/sendLink', (req, res) => {
    axios.get(req.body.siteUrl)
        .then((response) => {
            if (response.status === 200) {
                res.send(response.data)
            }
        }, (error) => res.send(error));
})


app.post('/makeBase64String', async(req, res) => {
    let deffer = [];
    req.body.images.forEach(async(url) => deffer.push(myPromise(url)))
    Promise.all(deffer).then((data) => res.json({ result: data, status: 'success' }))
})


function myPromise(url) {
    return new Promise(async(resolve) => {
        const actual = await imageToBase64(url);
        resolve(actual)
    })
}







app.set('port', process.env.PORT || 5000);


let server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port' + server.address().port);
});