import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Link } from "react-router-dom";

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
    let event = null;
    if(typeof(ship.events) !== 'undefined') {
      event = ship.events[0];
      if(event.eventType === 'ARRIVAL_TO_PORT') {
        result = event.port;
      }
    }

    return result;
  }

  displayShipForm(s) {
    console.log("ship to display: " + s.id);
    console.log(this.state);
    this.setState({ship: s}, ()=> console.log("updated state"));
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
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><Link to="" onClick={this.displayShipForm.bind(this, item)}>{item.name}</Link></td>
                        <td>{this.getBarrelsOfRum(item)}</td>
                        <td>{this.getGoldCoins(item)}</td>
                        <td>{this.getPortName(this.getCurrentPort(item))}</td>
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
              barrelsOfRum={this.getBarrelsOfRum(this.state.ship)}
              goldCoins={this.getGoldCoins(this.state.ship)}
              currentPort={this.getCurrentPort(this.state.ship)}/>}
        </Container>
      );
  }
}

export default Ships ;
