import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

class Ports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            portList: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1_0/port/')
            .then(response => this.setState({ portList: response.data }));
    }

    getGoodQty(goods, goodType) {
      let result = 0;
      if(typeof(goods) !== 'undefined') {
        for(const good of goods) {
          if(good.goodType == goodType) {
            result = good.qty;
            break;
          }
        }
      }
      return result;
    }

    getGoldCoins(goods) {
      return this.getGoodQty(goods, 'GOLD_COINS');
    }

    getBarrelsOfRum(goods) {
      return this.getGoodQty(goods, 'BARRELS_OF_RUM');
    }

    render() {
        const { totalReactPackages } = this.state;
        return (
          <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
          </Row>
            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Ports</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            #
                          </th>
                          <th scope="col" className="border-0">
                            Port Name
                          </th>
                          <th scope="col" className="border-0">
                            Barrels of Rum
                          </th>
                          <th scope="col" className="border-0">
                            Gold Coins
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.portList.map((item) => {
                        return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{this.getGoldCoins(item.goods)}</td>
                          <td>{this.getBarrelsOfRum(item.goods)}</td>
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

export default Ports ;
