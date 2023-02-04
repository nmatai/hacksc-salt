import * as React from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import CustomTabs from "./Tabs";
import {ButtonInsertText, ButtonReplaceText, ButtonReplaceTextAll} from './Button';

/* global Word, require */

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
        summary={<TabContent name="summary"/>} 
        correction={<TabContent name="correction"/>} 
        refinement={<TabContent name="refinement"/>}/>
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
