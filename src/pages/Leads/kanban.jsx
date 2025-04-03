import React from 'react';
import avatar from '../../assets/images/users/avatar-5.jpg';
import SimpleBar from 'simplebar-react';
import { Badge, Button, Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import TooltipElement from '../../Components/Common/Tooltip';
const index = () => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row g-2">
                        <div className="col-lg-3 col-auto">
                            <div className="search-box">
                                <input
                                    type="text"
                                    className="form-control search"
                                    id="search-task-options"
                                    placeholder="Search for project, tasks..."
                                />
                                <i className="ri-search-line search-icon"></i>
                            </div>
                        </div>
                        <div className="col-auto ms-sm-auto">
                            <div className="d-flex align-items-center gap-2">
                                <div className="avatar-group" id="newMembar">
                                    <TooltipElement tooltipText={'Alexis'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Anna'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Alexis'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Anna'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                        </div>
                                    </TooltipElement>
                                </div>
                                <div className="hstack gap-2">
                                    <Button color="primary">
                                        <i className="ri-add-line align-bottom"></i> Create Board
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tasks-board mb-3" id="kanbanboard">
                <div className="tasks-list">
                    <Card className='bg-soft-primary text-primary'>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <h6 className="fs-13 text-uppercase mb-0">
                                        Unassigned <small className="badge bg-success align-bottom ms-1 totaltask-badge">2</small>
                                    </h6>
                                </div>
                                <UncontrolledDropdown direction="down">
                                    <DropdownToggle className="text-reset" tag="a" role="button">
                                        <span className="fw-medium text-muted fs-13">
                                            Priority<i className="mdi mdi-chevron-down ms-1"></i>
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                        <DropdownItem href="#"> Details </DropdownItem>
                                        <DropdownItem href="#"> Cancel </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </CardBody>
                    </Card>
                    <SimpleBar style={{ height: '508px' }} className="px-3 mx-n3 mb-2">
                        <div id="unassigned-task" className="tasks">
                            <div className="card tasks-box">
                                <div className="card-body">
                                    <div className="d-flex mb-2">
                                        <h6 className="fs-14 mb-0 flex-grow-1 text-truncate task-title">
                                            <a href="apps-tasks-details.html" className="text-body d-block">
                                                Profile Page Structure
                                            </a>
                                        </h6>
                                        <UncontrolledDropdown direction="bottom">
                                            <DropdownToggle className="text-reset" tag="a" role="button">
                                                <span className="text-muted fs-18">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </span>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                                <DropdownItem href="#"> Details </DropdownItem>
                                                <DropdownItem href="#"> Cancel </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <p className="text-muted">Profile Page means a web page accessible to the public or to guests.</p>
                                    <div className="mb-3">
                                        <div className="d-flex mb-1">
                                            <div className="flex-grow-1">
                                                <h6 className="text-muted mb-0">
                                                    <span className="text-secondary">15%</span> of 100%
                                                </h6>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <span className="text-muted">03 Jan, 2022</span>
                                            </div>
                                        </div>
                                        <div className="progress rounded-3 progress-sm">
                                            <div
                                                className="progress-bar bg-danger"
                                                role="progressbar"
                                                style={{ width: '15%' }}
                                                ariaValuenow="15"
                                                ariaValuemin="0"
                                                ariaValuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <span className="badge bg-primary-subtle text-primary">Admin</span>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="avatar-group">
                                                <TooltipElement tooltipText={'Alexis'}>
                                                    <div className="avatar-group-item">
                                                        <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                </TooltipElement>
                                                <TooltipElement tooltipText={'Anna'}>
                                                    <div className="avatar-group-item">
                                                        <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                </TooltipElement>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer border-top-dashed">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <h6 className="text-muted mb-0">#VL2436</h6>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <ul className="link-inline mb-0">
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-eye-line align-bottom"></i> 04
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-question-answer-line align-bottom"></i>
                                                        19
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-attachment-2 align-bottom"></i> 02
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card tasks-box">
                                <div className="card-body">
                                    <div className="d-flex mb-2">
                                        <div className="flex-grow-1">
                                            <h6 className="fs-14 mb-0 flex-grow-1 text-truncate task-title">
                                                <a href="apps-tasks-details.html" className="text-body d-block">
                                                    Velzon - Admin Layout Design
                                                </a>
                                            </h6>
                                        </div>
                                        <UncontrolledDropdown direction="bottom">
                                            <DropdownToggle className="text-reset" tag="a" role="button">
                                                <span className="text-muted fs-18">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </span>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu dropdown-menu-end">
                                                <DropdownItem href="#"> Details </DropdownItem>
                                                <DropdownItem href="#"> Cancel </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                    <p className="text-muted">The dashboard is the front page of the Administration UI.</p>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 gap-1">
                                            <div className="d-flex gap-1">
                                                <Badge color="primary" className="bg-soft-primary text-primary" href="#">
                                                    Layout
                                                </Badge>
                                                <Badge color="primary" className="bg-soft-primary text-primary" href="#">
                                                    Admin
                                                </Badge>
                                                <Badge color="primary" className="bg-soft-primary text-primary" href="#">
                                                    Dashboard
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="avatar-group">
                                                <TooltipElement tooltipText={'Michael'}>
                                                    <div className="avatar-group-item">
                                                        <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                </TooltipElement>
                                                <TooltipElement tooltipText={'Alexis'}>
                                                    <div className="avatar-group-item">
                                                        <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                </TooltipElement>
                                                <TooltipElement tooltipText={'Anna'}>
                                                    <div className="avatar-group-item">
                                                        <img src={avatar} alt="" className="rounded-circle avatar-xxs" />
                                                    </div>
                                                </TooltipElement>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer border-top-dashed">
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <span className="text-muted">
                                                <i className="ri-time-line align-bottom"></i>
                                                07 Jan, 2022
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <ul className="link-inline mb-0">
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-eye-line align-bottom"></i> 14
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-question-answer-line align-bottom"></i>
                                                        32
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="javascript:void(0)" className="text-muted">
                                                        <i className="ri-attachment-2 align-bottom"></i> 05
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SimpleBar>
                    <div className="my-3">
                        <button className="btn btn-soft-info w-100" data-bs-toggle="modal" data-bs-target="#creatertaskModal">
                            Add More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default index;
