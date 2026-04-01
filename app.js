const express = require('express');
const path = require('path');
const app = express();
const {getNumsFromQuery, findMean, findMedian, findMode} = require('./app_helpers');

//helpers
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/mean', getNumsFromQuery, (req, res) => {
    const mean = findMean(req.nums);
    res.json({
        operation: 'mean',
        value: mean
    });
});

app.get('/median', getNumsFromQuery, (req, res) => {
    const median = findMedian(req.nums);
    res.json({
        operation: 'median',
        value: median
    });
});

app.get('/mode', getNumsFromQuery, (req, res) => {
    const mode = findMode(req.nums);
    res.json({
        operation: 'mode',
        value: mode
    });
});

app.get('/all', getNumsFromQuery, (req, res) => {
    const mode = findMode(req.nums);
    const median = findMode(req.nums);
    const mean = findMean(req.nums);
    res.json({
        operation: 'all',
        mean: mean,
        median: median,
        mode: mode
    });
});


// listener
app.listen(3000, () => {
    console.log('listening on port 3000');
});


