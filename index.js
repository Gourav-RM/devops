import express from "express";

const app = express();

app.listen(8081, () => console.log("Server is started............"))

app.get('/', (req, res) => {
    console.log("request received: ", new Date())
    res.status(200).send('Application is running!!!')
})