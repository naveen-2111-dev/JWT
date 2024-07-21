const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
app.use(express.json())
require('dotenv').config();
const posts = [
    {
        username: 'naveen',
        title: 'post 1'
    },
    {
        username: 'saran',
        title: 'post 2'
    },
    {
        username: 'harsha',
        title: 'post 3'
    }
]

app.get('/posts', AuthUser, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const user = {name: username}
    const AccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken : AccessToken})
})

function AuthUser(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401)
        req.user = user
        next()
    })
}

app.listen(3000)