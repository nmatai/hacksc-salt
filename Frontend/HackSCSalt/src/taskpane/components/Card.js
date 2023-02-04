import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "block",
      expanded: false,
      height:100
    };
  }

  changeExpanded = async () => {
    if (this.state.expanded) {
      this.setState({
        expanded: false,
        height:100
      });
    } else {
      this.setState({
        expanded: true,
        height:"fit-content"
      });
    }
  };
  insertText = async () => {
    // In the click event, write text to the document.
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph(this.props.paragraph, Word.InsertLocation.end);
      await context.sync();
      this.removeCard();
    });
  };

  removeCard = async () => {
    this.setState({
      visible: "none",
    });
  };

  render() {
    return (
      <div
        style={{
          padding: "24px 24px 0px 24px",
          margin: 20,
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          display: this.state.visible,
        }}
      >
        <div style={{ fontSize: 16, letterSpacing: 0.15, marginBottom: 15, fontWeight: 500 }}>Title</div>
        <div style={{ fontSize: 14, letterSpacing: 0.25, lineHeight: "20px", color: "#00000099" ,height:this.state.height,overflow:"hidden"}}>
          {this.props.paragraph}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginTop: 20 }}>
          <div>
            {this.state.expanded ? (
              <span onClick={this.changeExpanded}  class="material-symbols-outlined" style={{ cursor: "pointer" }}>arrow_drop_up</span>
            ) : (
              <span onClick={this.changeExpanded} style={{ cursor: "pointer" }} class="material-symbols-outlined">
                arrow_drop_down
              </span>
            )}
          </div>
          <div
            style={{
              justifySelf: "end",
              fontWeight: 600,
              color: "#00A110",
              fontSize: "14px",
              letterSpacing: "1.25px",
              cursor: "pointer",
            }}
            onClick={this.insertText}
          >
            ACCEPT
          </div>
          <div
            onClick={this.removeCard}
            style={{
              justifySelf: "end",
              fontWeight: 600,
              color: "#EE1D00",
              fontSize: "14px",
              letterSpacing: "1.25px",
              cursor: "pointer",
            }}
          >
            REJECT
          </div>
        </div>
      </div>
    );
  }
}
