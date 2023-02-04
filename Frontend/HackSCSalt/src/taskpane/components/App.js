import * as React from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import CustomTabs from "./Tabs";
import Card from "./Card";
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
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  },
  {
    "title" : "Refinement 2",
    "paragraph" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .........",
  }
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
      targetCurrentWord: '',
      targetNewWord: ''
    };

  }

  componentDidMount() {
    this.setState({
      targetCurrentWord: "Hello",
      targetNewWord: "Goodbye"
    });
  }

  changeCurrentWord = (event) => {
    const newWord = event.target.value;
    this.setState({
      targetCurrentWord: newWord,
    });
  }

  changeNewWord = (event) => {
    const newWord = event.target.value;
    this.setState({
      targetNewWord: newWord,
    });
  }

  render() {
    return (
      <div className="ms-welcome">
        <CustomTabs className="ms-customTabs" 
        summary={cardContentSummary.map((c) => (<Card title={c.title} paragraph={c.paragraph}/>))}
        correction={cardContentCorrection.map((c) => (<Card title={c.title} paragraph={c.paragraph}/>))}
        refinement={cardContentRefinement.map((c) => (<Card title={c.title} paragraph={c.paragraph}/>))}/>
        <div className="ms-taskItemsList">
          <ButtonInsertText newText="HackSC"/>
          <TextField label="Find" variant="standard" value={this.state.targetCurrentWord} onChange={this.changeCurrentWord}/>
          <TextField label="Replace" variant="standard" value={this.state.targetNewWord} onChange={this.changeNewWord}/>
          <ButtonReplaceTextAll currText={this.state.targetCurrentWord} newText={this.state.targetNewWord}/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
