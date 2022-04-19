const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const path = require('path')

const AccountRouter = require('./routes/account')
const LeaderboardRouter = require('./routes/leaderboard')
const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://ansonyan:123@cluster0.2pb5n.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


app.use(express.json())
app.use(express.static('dist'))

app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

app.use('/account', AccountRouter)

app.use('/leaderboard', LeaderboardRouter)

app.use((err, req, res, next) => {
    if (err) {
      console.log(err)
      res.send('error occured')
    } else {
      next()
    }
  })
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
  
  app.listen(3000, () => {
    console.log('listening on 3000')
    console.log('mongoDB is connected')
  })