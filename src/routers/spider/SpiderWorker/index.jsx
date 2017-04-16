import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Button, Breadcrumb, Icon, Row, Col } from 'antd';
import StatusPoint from 'components/StatusPoint';
import { OJ_MAP } from 'models/account';
import { WorkerStatus } from 'models/spider_worker';


class SpiderWorker extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
  }

  onOpenWorker(oj) {
    this.props.dispatch({
      type: 'spiderWorker/open',
      payload: { oj }
    });
  }

  onCloseWorker(oj) {
    this.props.dispatch({
      type: 'spiderWorker/close',
      payload: { oj }
    });
  }

  getWorkers() {
    const { list } = this.props;
    return Object.keys(OJ_MAP).map(oj => ({
      key: oj,
      oj_name: OJ_MAP[oj],
      status: list.indexOf(oj) < 0 ? WorkerStatus.STOP : WorkerStatus.RUNNING
    }));
  }

  render() {
    const workers = this.getWorkers();
    return (
      <div className="content-page">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/admin/main"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Icon type="list" /> 爬虫列表
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          {workers.map(worker =>
            <Col span={8} key={worker.key} style={{ padding: 10 }}>
              <Card
                title={<h3>{worker.oj_name}</h3>}
                bodyStyle={{ padding: '12px 10px' }}
              >
                {worker.status === 1
                  ? <StatusPoint color="green">运行中</StatusPoint>
                  : <StatusPoint color="red">停止</StatusPoint>}
                <span className="pull-right">
                  {worker.status === 0 ? (
                    <Button
                      size="small" type="primary"
                      onClick={() => this.onOpenWorker(worker.key)}
                    >
                      开启
                    </Button>
                  ) : (
                    <Button
                      size="small" type="primary"
                      onClick={() => this.onCloseWorker(worker.key)}
                    >
                      停止运行
                    </Button>
                  )}
                </span>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, spiderWorker }) => ({
  loading: loading.models.spiderWorker || false,
  list: spiderWorker.list
});

export default connect(mapStateToProps)(SpiderWorker);
