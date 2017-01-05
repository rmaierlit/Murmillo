import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';


class Editor extends React.Component {
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
      />
    );
  }
}


export default Editor;
