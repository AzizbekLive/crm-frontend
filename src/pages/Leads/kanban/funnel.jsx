import React, { useEffect, useState } from 'react';
import FunnelItem from './funnel-item';
import { Button, Card, CardBody, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { useLayoutStore } from '../../../stores/layouts';
import FunnelItemForm from './funnel-item-form';
// import TooltipElement from '../../../Components/Common/Tooltip';
import ColorPicker from '../../../Components/Common/ColorPicker';
import { decreaseColor } from '../../../helpers/methods';
import { useDroppable } from '@dnd-kit/core';

const Funnel = ({ column, leads, toggleDelete, handleCreatingColumn }) => {
    const { setNodeRef } = useDroppable({ id: column.id });

    const layoutModeType = useLayoutStore((state) => state.layoutModeType);

    const [mainColor, setMainColor] = useState(column.color);

    const [columnTitle, setColumnTitle] = useState(column.title);

    const [isEditing, setIsEditing] = useState(!!column?.isEditing);
    const toggleEditing = () => setIsEditing((p) => !p);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const changeMainColor = (color) => {
        setMainColor(color);
    };

    const onCancelEditing = () => {
        setColumnTitle(column.title);
        setMainColor(column.color);

        setIsEditing(false);
    };

    useEffect(() => {
        setColumnTitle(column.title);
        setMainColor(column.color);
        setIsEditing(column?.isEditing);
    }, [column.id]);

    return (
        <React.Fragment>
            <div className="tasks-list-content">
                <Card className="bg-light">
                    <CardBody className="funnel-header">
                        <div className="d-flex align-items-center position-relative">
                            <div className="flex-grow-1">
                                {!isEditing ? (
                                    <div className="fs-12 fw-bold text-uppercase mb-0 d-flex align-items-center" style={{ color: mainColor }}>
                                        <span>{columnTitle}</span>
                                        <span
                                            className="badge align-bottom ms-2 totaltask-badge fs-11 fw-bold"
                                            style={{ backgroundColor: decreaseColor(mainColor), color: mainColor }}>
                                            {column.counts}
                                        </span>
                                    </div>
                                ) : (
                                    <Input
                                        value={columnTitle}
                                        onChange={(e) => setColumnTitle(e.target.value)}
                                        type="text"
                                        className="form-control form-control-sm funnel-title-input"
                                    />
                                )}
                            </div>
                            {!isEditing ? (
                                // Toolbar
                                <div className="d-flex gap-1 position-absolute end-0 funnel-header-toolbar bg-light">
                                    <React.Fragment>
                                        <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={toggleEditing}>
                                            <i className="ri-pencil-line align-middle"></i>
                                        </Button>
                                        <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={() => toggleDelete(column)}>
                                            <i className="ri-delete-bin-line align-middle"></i>
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="p-3 btn-icon btn-ghost-dark rounded-circle"
                                            onClick={() => handleCreatingColumn(column.id)}>
                                            <i className="ri-add-line align-middle"></i>
                                        </Button>
                                    </React.Fragment>
                                </div>
                            ) : (
                                // Editing
                                <div className="d-flex gap-1 position-absolute funnel-header-editing end-0 bg-light">
                                    <React.Fragment>
                                        <UncontrolledDropdown>
                                            <DropdownToggle tag="button" className="border-0 btn-sm btn-icon btn-ghost-dark rounded-circle">
                                                <i className="ri-checkbox-blank-circle-fill align-middle" style={{ color: mainColor }}></i>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-md p-4">
                                                <ColorPicker defaultValue={mainColor} changeColor={changeMainColor} />
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={toggleEditing}>
                                            <i className="ri-check-fill align-middle text-success"></i>
                                        </Button>
                                        <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={onCancelEditing}>
                                            <i className="ri-close-line align-middle text-danger"></i>
                                        </Button>
                                    </React.Fragment>
                                </div>
                            )}
                        </div>
                    </CardBody>
                    <div className="px-2">
                        <div className="border-bottom"></div>
                        <div className="my-3">
                            <Button outline className={`w-100 border-dashed border-dark text-dark add-task-btn ${layoutModeType}`} onClick={openForm}>
                                <i className="ri-add-line align-bottom me-1"></i> Add Lead
                            </Button>
                        </div>
                        <div className="border-bottom"></div>
                    </div>
                    <CardBody>
                        <Collapse isOpen={isFormOpen}>
                            <FunnelItemForm closeForm={closeForm} />
                        </Collapse>
                        {!isFormOpen && (
                            // <SimpleBar style={{ height: '508px' }} forceVisible="x" className="px-3 mx-n3 mb-2">
                            <div ref={setNodeRef} className="tasks">
                                {leads && leads.length > 0 ? (
                                    leads.map((lead) => <FunnelItem key={lead.id} lead={lead} color={mainColor} />)
                                ) : (
                                    <div className="p-3 rounded-2 border border-dashed border-dark opacity-50 text-center">
                                        <i className="mdi mdi-folder-alert-outline align-middle fs-18"></i> Empty
                                    </div>
                                )}
                            </div>
                            // {/* </SimpleBar> */}
                        )}
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default Funnel;
