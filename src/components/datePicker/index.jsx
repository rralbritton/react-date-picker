import React from 'react';
import moment from 'moment';
import CalendarHeaderMonth from "./CalendarHeaderMonth";
import CalendarHeaderYear from "./CalendarHeaderYear";

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateContext: moment(),
            today: moment(),
            selectedDay: null
        }

    }

    /*Moment JS Utilities*/
    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        console.log("currentDay: ", this.state.dateContext.format("D"))
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = dateContext => {
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    render() {

        //deconstruct state
        const { dateContext } = this.state;

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(dateContext); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
            </td>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            //highlight the current day - color all other days white
            let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
            daysInMonth.push(
                <td key={d} className={"day " + selectedClass} >
                    <span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
                </td>
            );
        }

        /*combine blanks with daysInMonth array in order to set the full calendar*/
        var totalSlots = [...blanks, ...daysInMonth];

        console.log("totalSlots: ", totalSlots);

        /*Create rows. Each road should have 7 cells*/
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        console.log("rows: ", rows); //getting an extra row here? 
        //happening in the totalSlots for-loop
        //Need to review

        return (
            <div className="calendar-container">
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            <td colSpan="5">
                                <CalendarHeaderMonth
                                    month={this.month()}
                                    months={this.months}
                                    setMonth={this.setMonth} />
                                {" "}
                                <CalendarHeaderYear
                                    year={this.year()}
                                    setYear={this.setYear}
                                />
                            </td>
                            <td colSpan="2" className="nav-month">
                                <i className="prev fas fa-chevron-left"
                                    onClick={(e) => { this.prevMonth() }}>
                                </i>
                                <i className="prev fas fa-chevron-right"
                                    onClick={(e) => { this.nextMonth() }}>
                                </i>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {this.weekdaysShort.map(day => (
                                <td key={day} className="week-day">{day}</td>
                            ))}
                        </tr>
                        {rows.map((d, i) => (
                            <tr key={i * 100}>
                                {d}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        );
    }
}