import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import { bindActionCreators } from "redux";
import { actionCreators } from "../state/index"
import { useDispatch } from "react-redux";

function convert(str) {
    var mnths = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December"
    },
        date = str.split(" ");

    return [date[2], mnths[date[1]], date[3]].join("/");
}
export default function Datepicker() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDate = (date) => {
        setStartDate(date);
    };

    const handleEndDate = (date) => {
        setEndDate(date);
    };
    const dispatch = useDispatch()
    const { DateFunc } = bindActionCreators(actionCreators, dispatch)


    return (
        <>
            <div className="center">
                <h1>Date</h1>
                <form id="date">
                    <div className="form-group">
                        <h3>Start Date</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDate}
                        />
                        <h3>End Date</h3>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDate}
                        />

                    </div>
                </form>
                <button className="btn btn-primary" onClick={() => DateFunc([convert(`${startDate}`), convert(`${endDate}`)])} >Show Data</button>
                {/* {console.log(convert(`${startDate}`))}
                {console.log(convert(`${endDate}`))} */}
            </div>
        </>
    )
}
