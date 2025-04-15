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
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Funnel = ({ column, leads, toggleDelete, handleCreatingColumn, funnelIndex, activeCardStatus }) => {
    const { t } = useTranslation();

    const { setNodeRef, isOver } = useDroppable({ id: column.id });

    const layoutModeType = useLayoutStore((state) => state.layoutModeType);

    const [curFunnel, setCurFunnel] = useState({ ...column });

    const [isEditing, setIsEditing] = useState(!!column?.isEditing);
    const toggleEditing = () => setIsEditing((p) => !p);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const changeFunnel = (name, value) => {
        setCurFunnel((prev) => ({ ...prev, [name]: value }));
    };

    const changeMainColor = (color) => {
        changeFunnel('color', color);
        console.log('color change');
    };

    const onCancelEditing = () => {
        changeFunnel('title', column.title);
        changeFunnel('color', column.color);

        setIsEditing(false);
    };

    useEffect(() => {
        setCurFunnel({ ...column });
        setIsEditing(column?.isEditing);
    }, [column.id]);

    return (
        <React.Fragment>
            <motion.div ref={setNodeRef}>
                <div className="tasks-list-content">
                    <Card className={isOver ? 'tasks-list-content-over' : 'bg-light'} style={{ transition: 'all 0.2s linear' }}>
                        <CardBody className="funnel-header">
                            <div className="d-flex align-items-center position-relative">
                                <div className="flex-grow-1">
                                    {!isEditing ? (
                                        <div
                                            className="fs-12 fw-bold text-uppercase mb-0 d-flex align-items-center"
                                            style={{ color: curFunnel.color }}>
                                            <span onDoubleClick={toggleEditing}>{curFunnel.title}</span>
                                            <span
                                                className="badge align-bottom ms-2 totaltask-badge fs-11 fw-bold"
                                                style={{ backgroundColor: decreaseColor(curFunnel.color), color: curFunnel.color }}>
                                                {column.counts}
                                            </span>
                                        </div>
                                    ) : (
                                        <Input
                                            value={curFunnel.title}
                                            onChange={(e) => changeFunnel('title', e.target.value)}
                                            type="text"
                                            className="form-control form-control-sm funnel-title-input"
                                        />
                                    )}
                                </div>
                                {/* // Toolbar */}
                                <div className="d-flex gap-1 position-absolute end-0 funnel-header-toolbar bg-light">
                                    {isEditing ? (
                                        <React.Fragment>
                                            <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={toggleEditing}>
                                                <i className="ri-check-fill align-middle text-success"></i>
                                            </Button>
                                            <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={onCancelEditing}>
                                                <i className="ri-close-line align-middle text-danger"></i>
                                            </Button>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <UncontrolledDropdown>
                                                <DropdownToggle tag="button" className="border-0 btn-sm btn-icon btn-ghost-dark rounded-circle">
                                                    <i className="ri-checkbox-blank-circle-fill align-middle" style={{ color: curFunnel.color }}></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-md p-4">
                                                    <ColorPicker defaultValue={curFunnel.color} changeColor={changeMainColor} />
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            <Button
                                                size="sm"
                                                className="p-3 btn-icon btn-ghost-dark rounded-circle"
                                                onClick={() => handleCreatingColumn(column.id)}>
                                                <i className="ri-add-line align-middle"></i>
                                            </Button>
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    href="#"
                                                    className="btn btn-sm p-3 btn-icon btn-ghost-dark rounded-circle "
                                                    tag="button">
                                                    <i className="ri-more-2-fill align-middle"></i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href="#">
                                                        <i className="bx bx-message-detail me-2 text-muted align-bottom"></i>
                                                        {t('Send sms')}
                                                    </DropdownItem>
                                                    <DropdownItem href="#">
                                                        <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                        Forward
                                                    </DropdownItem>
                                                    {funnelIndex !== 0 && (
                                                        <DropdownItem href="#" className="text-danger" onClick={() => toggleDelete(column)}>
                                                            <i className="ri-delete-bin-5-line me-2 align-bottom"></i>
                                                            {t('Delete')}
                                                        </DropdownItem>
                                                    )}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                        <div className="px-2">
                            <div className="border-bottom"></div>
                            {funnelIndex === 0 && (
                                <div className="my-3">
                                    <Button
                                        outline
                                        className={`w-100 border-dashed border-dark text-dark add-task-btn ${layoutModeType}`}
                                        onClick={openForm}>
                                        <i className="ri-add-line align-bottom me-1"></i> Add Lead
                                    </Button>
                                </div>
                            )}
                            <div className="border-bottom"></div>
                        </div>
                        <CardBody>
                            <Collapse isOpen={isFormOpen}>
                                <FunnelItemForm closeForm={closeForm} />
                            </Collapse>
                            {!isFormOpen && (
                                <div ref={setNodeRef} className="tasks">
                                    <AnimatePresence>
                                        {isOver && column.id !== activeCardStatus && (
                                            <motion.div
                                                className="tasks-box bg"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 0.2, height: 188, backgroundColor: '#e0e0e0' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                style={{
                                                    borderRadius: '4px',
                                                    marginBottom: '8px',
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                    {leads && leads.length > 0 ? (
                                        leads.map((lead) => <FunnelItem key={lead.id} lead={lead} color={curFunnel.color} />)
                                    ) : (
                                        <div className="p-3 rounded-2 border border-dashed border-dark opacity-50 text-center">
                                            <i className="mdi mdi-folder-alert-outline align-middle fs-18"></i> Empty
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </motion.div>
        </React.Fragment>
    );
};

export default Funnel;
