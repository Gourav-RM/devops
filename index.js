import express from "express";

const app = express();

app.listen(8081, () => console.log("Server is started............"))

app.get('/', (req, res) => {
    console.log("request received: ", new Date())
    res.status(200).json({statusCode: 200, data: 'Server is up!!!'})
})

