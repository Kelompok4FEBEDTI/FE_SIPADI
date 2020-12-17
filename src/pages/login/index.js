import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  // Card,
  // Button,
  // CardTitle,
  // CardText,
  // Row,
  // Col,
} from 'reactstrap';
import classnames from 'classnames';
import { LoginMember, LoginPenjaga } from '../../components';
import './style.css';
// import { Link } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Container
      style={{
        margin: '0',
        position: 'absolute',
        top: '45%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
      className="login"
    >
      {/* <Link to="/loginmember">Login Member</Link>
      <Link to="/loginpenjagaparkir">Login Penjaga Parkir</Link> */}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Member
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Penjaga Parkir
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <LoginMember />
        </TabPane>
        <TabPane tabId="2">
          <LoginPenjaga />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Home;
