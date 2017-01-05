import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/chrome';


class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  updateCode(text) {
    console.log(text);
    //should send text to store
  }

  render() {
    return(
      <AceEditor
        mode="javascript"
        theme="chrome"
        name="code"
        width="100%"
        minLines={3}
        maxLines={50}
        ref="ace"
        fontSize={18}
        value="//type your code here"
        editorProps={{$blockScrolling: Infinity}}
        onChange={this.updateCode}
        onLoad={(editor) => {
          editor.focus();
          editor.getSession().setUseWrapMode(true);
        }}
      />
    );
  }
}


export default Editor;
