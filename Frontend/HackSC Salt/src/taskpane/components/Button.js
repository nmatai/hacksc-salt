import * as React from 'react';
import { PrimaryButton, IButtonProps } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';

export class ButtonInsertText extends React.Component {
  constructor(props) {
    super(props);
  }

  insertText = async () => {
    // In the click event, write text to the document.
    await Word.run(async (context) => {
      let body = context.document.body;
      body.insertParagraph('Hello Fluent UI React!', Word.InsertLocation.end);
      await context.sync();
    });
  }

  render() {
    let { disabled } = this.props;
    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Click the button to insert text.</Label>
        <PrimaryButton
          data-automation-id='test'
          disabled={ disabled }
          text='Insert text...'
          onClick={ this.insertText } />
      </div>
    );
  }
}

export class ButtonReplaceText extends React.Component {
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
          text='Replace text...'
          onClick={ () => {this.replaceText(currText, newText)} } />
      </div>
    );
  }
}