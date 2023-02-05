import * as React from "react";
import PropTypes from "prop-types";

import { DefaultButton, TextField } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import { ButtonInsertText, ButtonReplaceText } from "./Button";

import TextField from '@mui/material/TextField';
import CustomTabs from "./Tabs";
import Card from "./Card";
import ReplaceCard from "./ReplaceCard";
import {ButtonInsertText, ButtonReplaceText, ButtonReplaceTextAll} from './Button';


/* global Word, require */
const cardContentSummary = [
  {
    "title" : "Summary 1",
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  },
  {
    "title" : "Summary 2",
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  }
]

const cardContentCorrection = [
  {
    "title" : "Correction 1",
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  },
  {
    "title" : "Correction 2",
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  }
]

const cardContentRefinement = [
  {
    "title" : "Refinment 1",
    "find" : "Hello",
    "replace" : "Goodbye"
  },
  {
    "title" : "Refinment 2",
    "find" : "Goodbye",
    "replace" : "Hello"
  },
]
function TabContent({ name }) {
  return(
    <div>
      <text>{`Hi, I'm ${name}`}</text>
    </div>
  );
}

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
    this.setState({
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
        <CustomTabs className="ms-customTabs" 
        summary={cardContentSummary.map((c) => (<Card title={c.title} paragraph={c.paragraph}/>))}
        correction={cardContentCorrection.map((c) => (<Card title={c.title} paragraph={c.paragraph}/>))}
        refinement={cardContentRefinement.map((c) => (<ReplaceCard title={c.title} currText={c.find} newText={c.replace}/>))}/>
        <div className="ms-taskItemsList">
          <ButtonInsertText newText="HackSC"/>
          <TextField label="Find" variant="standard" value={this.state.targetCurrentWord} onChange={this.changeCurrentWord}/>
          <TextField label="Replace" variant="standard" value={this.state.targetNewWord} onChange={this.changeNewWord}/>
          <ButtonReplaceTextAll currText={this.state.targetCurrentWord} newText={this.state.targetNewWord}/>
        </div>


  {/* render() {
    return (
      <div className="ms-welcome">
        <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" />
        <HeroList message="Discover what this add-in can do for you today!" items={this.state.listItems}>
          <ButtonInsertText />
          <TextField value={this.state.targetCurrentWord} onChange={this.changeCurrentWord} />
          <TextField value={this.state.targetNewWord} onChange={this.changeNewWord} />
          <ButtonReplaceText currText={this.state.targetCurrentWord} newText={this.state.targetNewWord} />
        </HeroList>*/}
      </div> 
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
