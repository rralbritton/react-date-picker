import React from "react";
import moment from "moment";

export default class CalendarHeaderYear extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showYearPopup: false,
            showYearNav: false
        }
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    onYearChange = (e) => {
        this.props.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.props.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    render() {
        const { year } = this.props;

        return (
            this.state.showYearNav ?
                <input
                    defaultValue={year}
                    className="editor-year"
                    ref={(yearInput) => { this.yearInput = yearInput }}
                    onKeyUp={(e) => this.onKeyUpYear(e)}
                    onChange={(e) => this.onYearChange(e)}
                    type="number"
                    placeholder="year" />
                :
                <span
                    className="label-year"
                    onDoubleClick={(e) => { this.showYearEditor() }}>
                    {year}
                </span>
        )
    }
}
