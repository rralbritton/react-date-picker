import React from 'react'
import moment from "moment";

export default class CalendarHeaderMonth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMonthPopup: false
        }
    }

    onSelectChange = (e, data) => {
        this.props.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }

    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data} >
                    <a 
                        href="#" 
                        onClick={(e) => { this.onSelectChange(e, data) }}
                        className="selectList">
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    render() {
        return (
            <React.Fragment>
                <span
                    className="label-month"
                    onClick={(e) => { this.onChangeMonth(e, this.props.month) }}>
                    {this.props.month}

                    {this.state.showMonthPopup &&
                        <this.SelectList data={this.props.months} />
                    }
                </span>
            </React.Fragment>
        )
    }
}
