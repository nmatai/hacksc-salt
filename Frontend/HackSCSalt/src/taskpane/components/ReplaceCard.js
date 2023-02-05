import React, { Component } from "react";

export default class ReplaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "block",
      expanded: false,
      height:100,
      words: []
    };
    this.removeCard = this.removeCard.bind(this);
    this.replaceText = this.replaceText.bind(this);
    this.changeExpanded = this.changeExpanded.bind(this);
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

  findText = async (currText) => {
    await Word.run(async (context) => {
        let results = context.document.body.search(currText);
        context.load(results);
        await context.sync();
        this.setState({words: results.items})
        for (var i = 0; i < results.items.length; i++) {
            results.items[i].font.highlightColor = '#FFFF00'; //Yellow
            results.items[i].font.bold = true;
        }
        await context.sync();
      });
  };
  
  replaceText = async (currText, newText) => {
    await Word.run(async (context) => {
      let results = context.document.body.search(currText);
      context.load(results);
      return context.sync()
      .then(
        () => {
          for (var i = 0; i < results.items.length; i++) {
            results.items[i].insertHtml(newText, "replace");     //Replace the text HERE
          }
        }
      )
    });
  }

  removeEffectFind = async () => {
    await Word.run(async (context) => {
        for (var i = 0; i < this.words.length; i++) {
            this.words[i].font.color = 'black';
            this.words[i].font.highlightColor = null; //Yellow
            this.words[i].font.bold = false;
        }
        await context.sync();
      });
  }

  removeCard = () => {
    this.setState({
      visible: "none",
    });
  };

  accept = async () => {
    this.replaceText(this.props.currText, this.props.newText);
    this.removeCard();
  }

  componentDidMount() {
    this.findText(this.props.currText);
  }

  componentWillUnmount() {  
    this.removeEffectFind();
    this.setState({words: []});
  }

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
        <div style={{ fontSize: 16, letterSpacing: 0.15, marginBottom: 15, fontWeight: 500 }}>{this.props.title}</div>
        <div style={{ fontSize: 14, letterSpacing: 0.25, lineHeight: "20px", color: "#00000099" ,height:this.state.height,overflow:"hidden"}}>
          {`${this.props.currText} -> ${this.props.newText}`}
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
            onClick={this.accept}
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
