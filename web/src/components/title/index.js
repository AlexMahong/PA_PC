class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const style = {
      title: {
        borderBottom: '1px solid #eeeeee',
        padding: `15px 20px`,
      },
      titleText: {
        borderLeft: `4px solid #de002b`,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: '21px',
        color: '#1C1C1C'
      },
      content: {
        float: 'right',
        marginTop: -5
      }
    };
    return (
      <div style={style.title}>
        <div style={style.content}>
          {this.props.children}
        </div>
        <div style={style.titleText}>
          {this.props.title}
        </div>
      </div>
    )
  }
}
export default Title;