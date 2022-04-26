const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const appIns = require('applicationinsights')
appIns.setup()
.setSendLiveMetrics(true)
.start()

const app = express()
app.use(bodyParser.json())

app.get('/api/event', async (req, res) => {

    const telemetry = appIns.defaultClient
    telemetry.trackEvent({
        name: 'Bir Event Oluştu',
        properties: {
            loginCount: 100,
            lastLoginName: 'kazım etiksan'
        }
    })

    res.send('app insights event')
})

app.get('/api/metric', async (req, res) => {

    const telemetry = appIns.defaultClient
    telemetry.trackMetric({
        name: 'Order Count',
        value: 1000
    })

    res.send('app insights metric')
})

app.get('/api/exception', async (req, res) => {

    const telemetry = appIns.defaultClient
    telemetry.trackException({
        exception: new Error('Bir önemli hata oluştu!')
    })

    res.send('app insights exception')
})

app.get('/api/env', async (req, res) => {

    const connStr = process.env.CUSTOMCONNSTR_connection
    // const text = JSON.stringify(process.env)

    res.send('connection string: '+connStr)
})

app.get('/api/hello', async (req, res) => {

    res.send('Hello World')
})

app.get('/api/merhaba', (req, res) => {

    res.send('Merhaba Dünyalı')
})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName','lastName'])
    console.log(body)
    res.send('Hello '+body.firstName+' '+body.lastName)
})

app.listen(8080, () => {
    console.log('app server is running')
})