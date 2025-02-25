import express from "express";

const app = express();

app.listen(8081, () => console.log("Server is started............"))

app.get('/', (req, res) => {
    res.status(200).send('Application is running!!')
})