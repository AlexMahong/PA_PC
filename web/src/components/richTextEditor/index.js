import './kindeditor/themes/default/default.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)
  }

  // 初始化富文本编辑器
  initEditor = () => {
    let richTextEditor = KindEditor.create('#richTextEditor', {
      // allowFileManager : true
      // langType: 'zh-CN',
      autoHeightMode: true,
      width: '100%',
      minHeight: 500,
    });
  };
  componentDidMount() {
    this.initEditor();
  }

  render() {
    return (
      <textarea id="richTextEditor"/>
    )
  }
}

export default Editor;