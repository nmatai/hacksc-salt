import React, { Component } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

// import '../../style.css';

export default class Score extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ width: 180, height: 150, margin: "40px auto" }}>
        <div style={{ margin: "20px auto", width: "fit-content", fontWeight: 600, fontSize: 22 }}>Document Score</div>
        <div style={{ width: 120, height: 120,margin:"auto"}}>
        <CircularProgressbarWithChildren
          value={this.props.percentage}
          styles={buildStyles({
            strokeLinecap: "round",

            textSize: "32px",
            textAlign: "center",
            textWeight: "bold",

            pathTransitionDuration: 0.5,

            pathColor: "#00A110",
            textColor: "#00529D",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        >
          
          <div style={{ fontSize: 32, marginTop: -5, color: "#00A110" }}>
            <strong>{this.props.percentage}%</strong>
          </div>
        </CircularProgressbarWithChildren>
        </div>
      </div>
    );
  }
}
