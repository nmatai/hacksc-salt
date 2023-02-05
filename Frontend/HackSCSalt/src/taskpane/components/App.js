import * as React from "react";
import PropTypes from "prop-types";
import { DefaultButton, TextField } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import { ButtonInsertText, ButtonReplaceText } from "./Button";

/* global Word, require */

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      targetCurrentWord: "",
      targetNewWord: "",
    };
  }

  componentDidMount() {
    var data = this.readWholeDoc();

    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // };

    // fetch('https://60ff-2607-fb90-588-4774-7090-7732-9f6c-2fb5.ngrok.io/analyze',requestOptions)
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration",
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality",
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro",
        },
      ],
      targetCurrentWord: "Hello",
      targetNewWord: "Goodbye",
    });
    // this.callApi({"g":"y"})
  }

  changeCurrentWord = (event) => {
    const newWord = event.target.value;
    this.setState({
      targetCurrentWord: newWord,
    });
  };

  changeNewWord = (event) => {
    const newWord = event.target.value;
    this.setState({
      targetNewWord: newWord,
    });
  };

  readWholeDoc = async () => {
    var paragraphs;
    await Word.run(async (context) => {
      //   paragraphs = context.document.body.paragraphs;
      //   paragraphs.load("text");
      //   await context.sync();

      //   console.log(paragraphs.toJSON());

      //   // const json = await response.json();
      //   // setData(json);
      //   await context.sync();
      //   paragraphs["paragraphs"] = paragraphs.items
      //   delete paragraphs["items"]
      //   const requestOptions = {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      // };

      // fetch('https://60ff-2607-fb90-588-4774-7090-7732-9f6c-2fb5.ngrok.io/analyze',requestOptions)
      //   return paragraphs;
      var paragraphs = context.document.body.paragraphs;
      paragraphs.load("text");
      await context.sync();
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://60ff-2607-fb90-588-4774-7090-7732-9f6c-2fb5.ngrok.io/analyze", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
        }
      };
      var k = paragraphs.toJSON();
      k["paragraphs"] = k.items;
      delete k["items"];

      xhr.send(JSON.stringify(k));
      console.log(k);

      await context.sync();
    });
  };

  render() {
    return (
      <div className="ms-welcome">
        <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" />
        <HeroList message="Discover what this add-in can do for you today!" items={this.state.listItems}>
          <ButtonInsertText />
          <TextField value={this.state.targetCurrentWord} onChange={this.changeCurrentWord} />
          <TextField value={this.state.targetNewWord} onChange={this.changeNewWord} />
          <ButtonReplaceText currText={this.state.targetCurrentWord} newText={this.state.targetNewWord} />
        </HeroList>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
