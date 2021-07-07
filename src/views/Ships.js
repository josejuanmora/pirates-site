import React from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import ShipForm from "../components/ShipForm";

class Ships extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        shipList: [],
        ship: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/v1_0/ship/')
      .then(response => this.initShipList(response));
  }

  initShipList(response) {
    this.setState({ shipList: response.data });
    this.displayShipForm(response.data[0]);
  }

  getPortName(port) {
    let result = '';
    if (typeof(port) !== 'undefined' && port!=null) {
       result = port.name;
    }
    return result;
  }

  getGoodQty(ship, goodType) {
    let result = 0;
    if(typeof(ship.events) !== 'undefined') {
      let event = ship.events[0];
      for(const good of event.goods) {
        if(good.goodType === goodType) {
          result = good.qty;
          break;
        }
      }
    }
    return result;
  }

  getGoldCoins(ship) {
    return this.getGoodQty(ship, 'GOLD_COINS');
  }

  getBarrelsOfRum(ship) {
    return this.getGoodQty(ship, 'BARRELS_OF_RUM');
  }

  getCurrentPort(ship) {
    let result = null;
    if(typeof(ship.events) !== 'undefined') {
      let event = null;
      event = ship.events[0];
      if(event.eventType === 'ARRIVAL_TO_PORT') {
        result = event.port;
      }
    }
    return result;
  }

  getCurrentPortId(ship) {
    let port = this.getCurrentPort(ship);
    return port!=null ? port.id : null;
  }

  displayShipForm(s) {
    this.setState({ship: s});
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
                        <th scope="col" className="border-0">
                          Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.shipList.map((item) => {
                      return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{this.getBarrelsOfRum(item)}</td>
                        <td>{this.getGoldCoins(item)}</td>
                        <td>{this.getPortName(this.getCurrentPort(item))}</td>
                        <td><Button type="submit" onClick={this.displayShipForm.bind(this, item)}>Detail</Button></td>
                      </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {this.state.ship!=null &&
            <ShipForm
              id={this.state.ship.id}
              name={this.state.ship.name}
              currentPortId={this.getCurrentPortId(this.state.ship)}/>}
        </Container>
      );
  }
}

export default Ships ;
