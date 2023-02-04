import * as React from "react";
import PropTypes from "prop-types";
import { DefaultButton, TextField } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import {ButtonInsertText, ButtonReplaceText} from './Button';

/* global Word, require */

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


  // click = async () => {
  //   return Word.run(async (context) => {
  //     /**
  //      * Insert your Word code here
  //      */

  //     // insert a paragraph at the end of the document.
  //     const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);

  //     // change the paragraph color to blue.
  //     paragraph.font.color = "blue";

  //     await context.sync();
  //   });
  // };



  render() {
    return (
      <div className="ms-welcome">
      <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" />
      <HeroList message="Discover what this add-in can do for you today!" items={this.state.listItems} >
        <ButtonInsertText />
        <TextField value={this.state.targetCurrentWord} onChange={this.changeCurrentWord}/>
        <TextField value={this.state.targetNewWord} onChange={this.changeNewWord}/>
        <ButtonReplaceText currText={this.state.targetCurrentWord} newText={this.state.targetNewWord}/>
      </HeroList>
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
