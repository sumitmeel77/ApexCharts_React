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

function TimeSeries(data) {
    let NumberArray = []
    let DateArray = []
    let date = ""
    let count = 0
    for (let i = 0; i < data.length; i++) {
        if ((data[i].arrival_date_month + "/" + data[i].arrival_date_day_of_month + "/" + data[i].arrival_date_year) == date) {
            count = count + data[i].adults + data[i].children + data[i].babies
        } else {
            if (date != "") {
                NumberArray.push(count)
                DateArray.push(date)
                date = data[i].arrival_date_month + "/" + data[i].arrival_date_day_of_month + "/" + data[i].arrival_date_year;
                count = data[i].adults + data[i].children + data[i].babies
            } else {
                date = data[i].arrival_date_month + "/" + data[i].arrival_date_day_of_month + "/" + data[i].arrival_date_year;
                count = data[i].adults + data[i].children + data[i].babies
            }

        }
    }
    return ([NumberArray, DateArray])
}
function ColumnChart(data) {
    let tempArray = []

    for (let i = 0; i < data.length; i++) {
        tempArray.push(data[i].country)
    }
    let CountryArray = [...new Set(tempArray)]
    let NumberArray = []

    for (let i = 0; i < CountryArray.length; i++) {
        let count = 0;
        for (let j = 0; j < data.length; j++) {
            if (data[j].country == CountryArray[i]) {
                count = count + data[j].adults + data[j].children + data[j].babies
            }
        }
        NumberArray.push(count)
    }
    return ([NumberArray, CountryArray])
}
app.get("/api/timeseries", async (req, res) => {
    try {
        const data = await Data.find()
        const output = TimeSeries(data)
        res.json({ status: output })
    } catch (error) {
        res.json({ status: error })
    }

})

app.get("/api/columnChart", async (req, res) => {
    try {
        const data = await Data.find()
        const output = ColumnChart(data)
        res.json({ status: output })
    } catch (error) {
        res.json({ status: error })
    }

})

app.listen(port, () => {
    console.log(`server at ${port}`)
}
)