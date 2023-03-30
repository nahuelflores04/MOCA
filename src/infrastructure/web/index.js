import express from 'express';

const app = express()

//Set middlewars, statics, use, etc

app.get('/', (req,res)=>{
    res.send('SERVER OK')
});

export default app