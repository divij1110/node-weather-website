const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divij Sharma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Divij Sharma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        helptext: 'you need help',
        name: 'Divij Sharma'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    } else {
        geocode(req.query.address, (error, data) => {
            if (error) {
                return res.send('Unable to find location. Try another search.')
            }
            
            forecast(data.latitude,data.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
            
                return res.send({
                    Location: data.location,
                    Forecast: forecastData
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Divij Sharma',
        text: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name:'Divij Sharma',
        text: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port )
})