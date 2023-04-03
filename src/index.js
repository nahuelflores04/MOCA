import app from "./infrastructure/web/index.js";

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Server on port:', port)
});
