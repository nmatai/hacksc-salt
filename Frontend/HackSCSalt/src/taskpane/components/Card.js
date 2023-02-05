import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "block",
      expanded: false,
      height: 100,
      copied: false,
    };
  }

  changeExpanded = async () => {
    if (this.state.expanded) {
      this.setState({
        expanded: false,
        height: 100,
      });
    } else {
      this.setState({
        expanded: true,
        height: "fit-content",
      });
    }
  };

  insertText = async () => {
    if (this.props.type == "addition") {
      // In the click event, write text to the document.
      await Word.run(async (context) => {
        let body = context.document.body;
        var result = context.document.body.search("The parties acknowledge that they have been represented");
        result.load("text,items");
        await context.sync();
        var paragraphs = context.document.body.paragraphs;

        paragraphs.load("text,items");
        await context.sync();
        // var cnt =10
        var cnt=this.props.updateCount();

        result.items[0].paragraphs.getFirst().insertText( cnt+". "+ this.props.title + "\n", "Start");
        result.items[0].paragraphs.getFirst().insertText(this.props.paragraph + "\n", "Start");

        // this.props.para[4].select()

        // result.items[0].paragraphs.getFirst();
        // result.items[0].paragraphs.getFirst().insertText

        // body.insertParagraph(this.props.title, Word.InsertLocation.end);
        // body.insertParagraph(this.props.paragraph, Word.InsertLocation.end);
        await context.sync();
        this.removeCard();
      });
    } else {
      navigator.clipboard.writeText(this.props.paragraph);
      this.setState({
        copied: true,
      });
      // alert("text copied");
    }
  };

  removeCard = async () => {
    this.setState({
      visible: "none",
    });
  };

  selectText = async () => {
    if (this.props.type != "addition") {
      await Word.run(async (context) => {
        var result = context.document.body.search(this.props.para[parseInt(this.props.id)].slice(0, 200));
        result.load("text,items");
        await context.sync();

        // this.props.para[4].select()

        result.items[0].paragraphs.getFirst().select();

        // var result = context.document.body.search(this.props.para[4].slice(200, 400));
        // result.load("text,items");
        // await context.sync();

        // result.items[0].select();
        // result.items[0]

        await context.sync();
      });
    }
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
        onClick={this.selectText}
      >
        <div style={{ fontSize: 16, letterSpacing: 0.15, marginBottom: 15, fontWeight: 500 }}>{this.props.title}</div>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 0.25,
            lineHeight: "20px",
            color: "#00000099",
            height: this.state.height,
            overflow: "hidden",
          }}
        >
          {this.props.paragraph}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginTop: 20 }}>
          <div>
            {this.state.expanded ? (
              <span onClick={this.changeExpanded} class="material-symbols-outlined" style={{ cursor: "pointer" }}>
                arrow_drop_up
              </span>
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
            {this.props.type === "addition" ? "ACCEPT" : !this.state.copied ? "COPY" : "COPIED"}
            {/* ACCEPT */}
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
