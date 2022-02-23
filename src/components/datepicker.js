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
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='heading'>DATE PICKER</div>
                    </div>
                    <div className="col">
                        <form id="date">
                            <div>
                                <div className="subheading">Start Date</div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDate}
                                />
                                <div className="subheading">End Date</div>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDate}
                                />

                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={() => DateFunc([convert(`${startDate}`), convert(`${endDate}`)])} >Show Data</button>
                    </div>
                </div>
                {/* {console.log(convert(`${startDate}`))}
                {console.log(convert(`${endDate}`))} */}
            </div>
            <style jsx>{`
        .container {
          width: 40%;
          margin-top: 25px;
          overflow: hidden;
          margin-bottom:25px;
        }
        .heading{
            color:#ffffff;
            margin-left:30%;
            margin-top: 12%;
            font-size: 20px;
        }
        .subheading{
            color:#ffffff;
            font-size: 15px;
        }
        .btn{
            margin-top:12%
        }
      `}</style>
        </>
    )
}
