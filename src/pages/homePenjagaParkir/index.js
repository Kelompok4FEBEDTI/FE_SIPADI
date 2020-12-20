import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Container } from 'react-bootstrap';
import classnames from 'classnames';
import { TransaksiKeluar, TransaksiMasuk } from '../../components';

const HomePenjagaParkir = () => {
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
        backgroundColor: 'unset',
      }}
      className="login"
    >
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Parkir Masuk
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Parkir Keluar
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TransaksiMasuk />
        </TabPane>
        <TabPane tabId="2">
          <TransaksiKeluar />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default HomePenjagaParkir;
