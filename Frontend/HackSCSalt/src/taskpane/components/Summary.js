import React, { Component } from "react";
import Score from "./Score";

export default class Summary extends Component {
  render() {
    return (
      <div>
        <Score percentage={76} />

        <div style={{ margin: "20px auto",paddingBottom:10 }}>
          <div style={{ fontWeight: 600, fontSize: 32, width: "fit-content", margin: "auto" }}>Summary</div>

          <div
            style={{
              padding: "24px",
              margin: 20,
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              fontWeight:600
            }}
          >
                The parties agree to enter into a confidential relationship concerning the disclosure of certain proprietary and confidential information. "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which the parties are engaged. The nondisclosure provisions of this Agreement shall survive the termination of the Agreement. 
          </div>
          <div style={{ fontWeight: 600, fontSize: 32, width: "fit-content", margin: "auto" }}>Entities Extracted</div>

          <div
            style={{
              padding: "20px",
              margin: "10px 20px 40px 20px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              fontWeight:600
            }}
          >
                <ol>
                  <li> Recieving Party : ABC INC</li>
                  <li> Disclosing Party : XYZ LLC</li>
                  <li> Aggrement Duration : 12 Months</li>
                  <li> Aggrement Start Date : 02/04/2023</li>
                </ol>
          </div>
        </div>
        
      </div>
    );
  }
}
