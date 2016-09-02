import React, { PropTypes } from 'react';
import { Row, Col } from 'antd';
import './style.less';

export default class Auth extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageHeight: document.body.clientHeight
    };
    this.handleResize = () => {
      this.setState({ pageHeight: document.body.clientHeight });
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { pageHeight } = this.state;
    return (
      <div className="auth-page" style={{ minHeight: pageHeight }} >
        <Row className="auth-row" type="flex" justify="space-around" align="middle" >
          <Col className="figure" xs={{ span: 24 }} sm={{ span: 24 }}>
            <h1>CUIT ACM Team</h1>
            <p>与世界分享你的zhuangbi</p>
          </Col>
          {this.props.children}
        </Row>
      </div>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.element.isRequired
};
