const express = require('express');
const path = require('path');
const app = express();
const {getNumsFromQuery, findMean, findMedian, findMode} = require('./app_helpers');
const fs = require('fs/promises');


// mids
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// save functionality
const SAVE_FILE = path.join(__dirname, 'saved-calculations.jsonl');
const saveCalculation = async (record) => {
    await fs.appendFile(SAVE_FILE, `${JSON.stringify(record)}\n`, 'utf8');
};


// routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/mean', getNumsFromQuery, async (req, res) => {
   const result = {
        operation: 'mean',
        mode: findMean(req.nums)
    };
 
   if(req.query.save === 'true') {
        await saveCalculation({
            nums: req.nums,
            ...result,
            savedAt: new Date().toISOString()
        });
    };

    res.json({result});
});

app.get('/median', getNumsFromQuery, async (req, res) => {
    const result = {
        operation: 'mode',
        mode: findMedian(req.nums)
    };
 
   if(req.query.save === 'true') {
        await saveCalculation({
            nums: req.nums,
            ...result,
            savedAt: new Date().toISOString()
        });
    };

    res.json({result});
});

app.get('/mode', getNumsFromQuery, async (req, res) => {
    const result = {
        operation: 'mode',
        mode: findMode(req.nums)
    };
 
   if(req.query.save === 'true') {
        await saveCalculation({
            nums: req.nums,
            ...result,
            savedAt: new Date().toISOString()
        });
    };

    res.json({result});
});

app.get('/all', getNumsFromQuery, async (req, res) => {
    const result = {
        operation: 'all',
        mean: findMean(req.nums),
        median: findMedian(req.nums),
        mode: findMode(req.nums)
    };

    if(req.query.save === 'true') {
        await saveCalculation({
            nums: req.nums,
            ...result,
            savedAt: new Date().toISOString()
        });
    };

    res.json({result});
});


// listener
app.listen(3000, () => {
    console.log('listening on port 3000');
});


