const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Paths definidos para Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const parcialPath = path.join(__dirname, '../templates/partials')
    //crear la aplicacion 
const app = express()
const port = process.env.PORT || 3000

//Personalizar el servidor
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(parcialPath)
    //Establecer servidor estatico
app.use(express.static(publicDirectoryPath))

// Que va a hacer la aplicación para app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Laura Morales'
    })
})

// Que va a hacer la aplicación para app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Laura M'
    })
})

// Que va a hacer la aplicación para app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help App',
        name: 'Laura Morales',
        message: 'This is the help page'
    })
})

// Que va a hacer la aplicación para app.com/weather
app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, { place, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                place,
                data,
                address
            })

        })

    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        message: 'Help article not found',
        name: 'Laura Morales'
    })
})

//Para 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        message: 'My 404 page',
        name: 'Laura Morales'
    })
})

//Server up
app.listen(port, () => {
    console.log('Server is up un port ' + port)
})