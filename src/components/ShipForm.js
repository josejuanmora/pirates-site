import React from "react";
import axios from 'axios';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  FormInput,
  FormSelect,
  Button
} from "shards-react";

class ShipForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        portList: [],
        barrelsOfRum: props.barrelsOfRum,
        goldCoins : props.goldCoins,
        currentPort : props.currentPort,
        portId : (props.currentPort != null) ? props.currentPort.id : null
    };
    this.updateShipStatus=this.updateShipStatus.bind(this);
    this.handlePortChange=this.handlePortChange.bind(this);
    this.handleBarrelsOfRumChange=this.handleBarrelsOfRumChange.bind(this);
    this.handleGoldCoinsChange=this.handleGoldCoinsChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/v1_0/port/')
      .then(response => this.initPortList(response));
  }

  initPortList(response) {
    let portList = response.data;
    if(this.state.portId == null) {
      this.setState({ portList: portList, portId : portList[0].id});
    }
  }

  updateShipStatus() {
    let eventType = this.state.currentPort !=null ?
      'DEPARTURE_FROM_PORT' : 'ARRIVAL_TO_PORT';

    axios.put('http://localhost:8080/api/v1_0/ship/' + this.props.id + '/event', {
      portId: this.state.portId,
      eventType: eventType,
      goods: [
        { goodType : "GOLD_COINS", qty : this.state.goldCoins },
        { goodType : "BARRELS_OF_RUM", qty : this.state.barrelsOfRum }]
    })
    .then((response) => {
      console.log("put response is " + response);
    }, (error) => {
      console.log("put error is " + error);
    });

    return true;
  }

  handlePortChange(event) {
    this.setState({portId : event.target.value});
  }

  handleBarrelsOfRumChange(event) {
    this.setState({barrelsOfRum : event.target.value});
  }

  handleGoldCoinsChange(event) {
    this.setState({goldCoins : event.target.value});
  }
  render() {
    return (
      <Card small>
        <CardHeader className="border-bottom">
          <h6 className="m-0">#{this.props.id} - {this.props.name}</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                    <label htmlFor="feBarrelsOfRum">Barrels of Rum</label>
                    <FormInput id="feBarrelsOfRum" defaultValue={this.state.barrelsOfRum}
                      onChange={this.handleBarrelsOfRumChange} />
                    </Col>
                  </Row>

                  <Row form>
                    <Col md="6" className="form-group">
                    <label htmlFor="feGoldCoins">Gold Coins</label>
                    <FormInput id="feGoldCoins" defaultValue={this.state.goldCoins}
                      onChange={this.handleGoldCoinsChange} />
                    </Col>
                  </Row>
                  {this.state.currentPort==null &&
                  <Row form>
                    <Col md="4" className="form-group">
                      <label htmlFor="fePort">Port</label>
                      <FormSelect defaultValue={this.state.portId}
                        onChange={this.handlePortChange}>
                      {this.state.portList.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        );
                      })}
                      </FormSelect>
                    </Col>
                  </Row>
                  }
                  <Button type="submit" onClick={this.updateShipStatus}>Update</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default ShipForm;
