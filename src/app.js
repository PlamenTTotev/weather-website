const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//define paths for express config
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectory))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Plamen'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Plamen'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name:'Plamen',
        helptext: 'Easy to use'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({
                error: 'You must provide a valid location'
            })
        }
    
        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({
                    error: 'You must provide a valid location'
                })
            } 

            res.send({
                forecast:forecastData,
                location:location
            })       
        })
    })    
})

// app.get('/products', (req,res)=>{

//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send({
//         products:[],
//     })
// })

app.get('/help/*', (req,res)=>{
    res.render('help', {
        title: 'Article not found',
        name:'Plamen',
    })
})

app.get('*', (req,res)=>{
    res.render('help', {
        title: 'Page not found',
        name:'Plamen',
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
});