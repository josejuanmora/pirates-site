import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

class Ships extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shipList: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1_0/ship/')
            .then(response => this.setState({ shipList: response.data }));
    }

    getPortName(port) {
       let result = '';
       if (typeof(port) !== 'undefined') {
         result = port.name;
       }
       return result;
    }

    getGoodQty(events, goodType) {
      let result = 0;
      if(typeof(events) !== 'undefined') {
        let event = events[0];
        for(const good of event.goods) {
          if(good.goodType === goodType) {
            result = good.qty;
            break;
          }
        }
      }
      return result;
    }

    getGoldCoins(events) {
      return this.getGoodQty(events, 'GOLD_COINS');
    }

    getBarrelsOfRum(events) {
      return this.getGoodQty(events, 'BARRELS_OF_RUM');
    }

    getCurrentPort(events) {
      let result = '';
      console.log(events);
      if(typeof(events) !== 'undefined') {
        result = events[0].port.name;
      }
      return result;
    }

    render() {
        return (
          <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
          </Row>
            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Ships</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            #
                          </th>
                          <th scope="col" className="border-0">
                            Ship Name
                          </th>
                          <th scope="col" className="border-0">
                            Barrels of Rum
                          </th>
                          <th scope="col" className="border-0">
                            Gold Coins
                          </th>
                          <th scope="col" className="border-0">
                            Is at Port
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.shipList.map((item) => {
                        return (
                        <tr>
                          <td>{item.id}</td>
                          <td><a href={"/ships/?id=" + item.id}>{item.name}</a></td>
                          <td>{this.getBarrelsOfRum(item.events)}</td>
                          <td>{this.getGoldCoins(item.events)}</td>
                          <td>{this.getCurrentPort(item.events)}</td>
                        </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        );
    }
}

export default Ships ;
