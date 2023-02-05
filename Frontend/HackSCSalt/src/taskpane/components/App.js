import * as React from "react";
import PropTypes from "prop-types";

// import { DefaultButton, TextField } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import { ButtonInsertText, ButtonReplaceText, ButtonReplaceTextAll } from "./Button";

import TextField from "@mui/material/TextField";
import CustomTabs from "./Tabs";
import Card from "./Card";
import ReplaceCard from "./ReplaceCard";
import Summary from "./Summary";
// import {ButtonInsertText, ButtonReplaceText, } from './Button';

/* global Word, require */



export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      targetCurrentWord: "",
      targetNewWord: "",
      final: {},
      clause_cnt:9,
      response: {
        incomplete_clauses:[
          {
              title:"Exclusions from Confidential Information",
              id:"7",
              suggestion:"The input clause is missing the following sub clauses: (b) discovered or created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the Receiving Party through legitimate means other than from the Disclosing Party or Disclosing Party\\'s representatives; (d) is disclosed by Receiving Party with Disclosing Party\\'s prior written approval."
          }
      ],
        unidentified_clauses: ["30"],
        missing_clauses: [
          {
            title: "Assignment",
            paragraph:
              "Receiving Party shall not assign this Agreement or any of its rights or obligations hereunder, whether by operation of law or otherwise, without the prior written consent of Disclosing Party, and any attempted assignment without such consent shall be null and void.",
          },
        ],
        // missing_clauses:[],
        status: "success",
      },
    };
  }

  updateCount=()=>{
    var k =this.state.clause_cnt
    this.setState({
      clause_cnt:k+1
    })
    return k+1
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
      xhr.onreadystatechange =  ()=> {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var resp = JSON.parse(xhr.responseText);
          this.setState({ response:resp})
        }
      };
      var k = paragraphs.toJSON();
      k["paragraphs"] = k.items;
      delete k["items"];

      var final = {};
      for (let index = 0; index < k["paragraphs"].length; index++) {
        const element = k["paragraphs"][index];
        var text = element["text"];
        text = text.replace("\xa0", " ");
        final[index] = text;
      }

      xhr.send(JSON.stringify(final));
      console.log(final);

      await context.sync();
      this.setState({ final: final });
    });
  };
  render() {
    return (
      <div className="ms-welcome">
        <CustomTabs
          className="ms-customTabs"
          summary={<Summary />}
          correction={this.state.response.missing_clauses.map((c) => (
            <Card type="addition" title={c.title} paragraph={c.paragraph} para={this.state.final} updateCount={this.updateCount} />
          ))}
          refinement={this.state.response.incomplete_clauses.map((c) => (
            <Card type="correction" title={c.title} id={c.id} paragraph={c.suggestion} para={this.state.final}/>
          ))}
        />
        {/* <div className="ms-taskItemsList">
          <ButtonInsertText newText="HackSC"/>
          <TextField label="Find" variant="standard" value={this.state.targetCurrentWord} onChange={this.changeCurrentWord}/>
          <TextField label="Replace" variant="standard" value={this.state.targetNewWord} onChange={this.changeNewWord}/>
          <ButtonReplaceTextAll currText={this.state.targetCurrentWord} newText={this.state.targetNewWord}/>
        </div> */}

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
