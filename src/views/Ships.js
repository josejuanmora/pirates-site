import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

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

    render() {
        const { totalReactPackages } = this.state;
        return (
          <Container fluid className="main-content-container px-4">
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
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.shipList.map((item) => {
                        return (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
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
