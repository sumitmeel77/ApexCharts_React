const express = require("express")
const mongoose = require('mongoose')
const Data = require("./model/data")
const cors = require('cors');
const port = process.env.PORT || 5000;
const url = "mongodb+srv://username:7XghN1z4RQomBj7n@cluster0.mpfwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// connecting with mongoose
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("connection successfull") }).catch((err) => console.log(err))

const app = express()

app.use(cors());

app.use(express.json());

app.get("/api/getData", async (req, res) => {
    try {
        const data = await Data.find()
        res.json({ status: data })
    } catch (error) {
        res.json({ status: error })
    }

})

app.listen(port, () => {
    console.log(`server at ${port}`)
}
)