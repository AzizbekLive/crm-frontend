import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
const ShowLead = ({ lead }) => {
    const [data, setData] = useState(lead);
    const [customActiveTab, setcustomActiveTab] = useState('1');
    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };
    return (
        <div>
            <div className="d-flex mb-2 align-items-center">
                <h5 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                    <span className="text-body">{data.name}</span>
                </h5>
            </div>
            <div className="mb- d-flex flex-column gap-1">
                {data.phones.map((phone, index) => (
                    <div className="d-flex" key={phone + index}>
                        <div className="d-flex gap-2 align-items-center">
                            <i className="ri-phone-line align-bottom fs-18"></i>
                            <span>{phone}</span>
                        </div>
                    </div>
                ))}
                {data.addresses?.map((address, index) => (
                    <div className="d-flex" key={index + address}>
                        <div className="d-flex gap-2 align-items-center">
                            <i className="ri-map-pin-line align-bottom fs-18"></i>
                            <span>{address}</span>
                        </div>
                    </div>
                ))}
                {/* <div className="d-flex">
                        <div className="d-flex gap-2 align-items-center">
                            <i className="ri-map-pin-line align-bottom fs-18"></i>
                            <span>{data.address}</span>
                        </div>
                    </div> */}
            </div>

            <Nav tabs className="nav nav-tabs nav-tabs-custom nav-primary nav-justified mb-3">
                <NavItem>
                    <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                            active: customActiveTab === '1',
                        })}
                        onClick={() => toggleCustom('1')}>
                        Voice
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{ cursor: 'pointer' }}
                        className={classnames({
                            active: customActiveTab === '2',
                        })}
                        onClick={() => toggleCustom('2')}>
                        Note
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={customActiveTab} className="text-muted">
                <TabPane tabId="1" id="home1">
                    <div className="d-flex"></div>
                </TabPane>
                <TabPane tabId="2">
                    
                </TabPane>
            </TabContent>
        </div>
    );
};

export default ShowLead;
