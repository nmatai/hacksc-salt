import * as React from 'react';
import { PrimaryButton, IButtonProps } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';

// Insert new text
export class ButtonInsertText extends React.Component {
  constructor(props) {
    super(props);
  }

  insertText = async (newText) => {
    // In the click event, write text to the document.
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph(newText, Word.InsertLocation.end);
      await context.sync();
    });
  }

  render() {
    let { disabled, newText } = this.props;
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Click the button to insert text.</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          text='Insert text'
          onClick={ () => this.insertText(newText) } />
      </div>
    );
  }
}

// Replace instances of text
export class ButtonReplaceTextAll extends React.Component {
  constructor(props) {
    super(props);
  }

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

  render() {
    let { disabled, currText, newText } = this.props;
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Click the button to replace text.</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          text='Replace all text'
          onClick={ () => {this.replaceText(currText, newText)} } />
      </div>
    );
  }
}

// Replace instances of text
export class ButtonReplaceText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currTextIdx: 0,
      currTextLen: 0,
    }
  }

  nextText = () => {
    
  }

  replaceText = async (currText, newText) => {
    await Word.run(async (context) => {
      let results = context.document.body.search(currText);
      context.load(results);
      return context.sync()
      .then(
        () => {
          // this.setState({currTextLen: results.items.length});
          console.log(results.items[0]);
          results.items[0].insertHtml(newText, "replace");     //Replace the text HERE
          if (this.state.currTextIdx < results.items.length)
            {
              this.setState({currTextIdx: currTextIdx + 1});
            }
            else {
              this.setState({currTextIdx: 0});
            }
        }
      )
    });
  }

  render() {
    let { disabled, currText, newText } = this.props;
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Click the button to replace text.</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          text='Replace next text'
          onClick={ () => {
            this.replaceText(currText, newText);
          }} />
      </div>
    );
  }
}