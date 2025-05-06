import React, { useEffect, useRef, useState } from 'react';
import FunnelItem from './funnel-item';
import {
    Button,
    Card,
    CardBody,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Modal,
    ModalBody,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    UncontrolledDropdown,
} from 'reactstrap';
import { useLayoutStore } from '../../../stores/layouts';
import FunnelItemForm from './funnel-item-form';
// import TooltipElement from '../../../Components/Common/Tooltip';
import ColorPicker from '../../../Components/Common/ColorPicker';
import { decreaseColor } from '../../../helpers/methods';
import { useDroppable } from '@dnd-kit/core';
import { AnimatePresence, motion } from 'framer-motion';
import { deleteService, updateService } from '../../../service';
import { KANBAN_ENDPOINT } from '../../../helpers/url_helper';
import DeleteModal from '../../../Components/Common/DeleteModal';
import warningImage from '../../../assets/images/warning.png';
import { toast } from 'sonner';
import FormDatePicker from '../../../Components/Form/FormDatePicker';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ShowLead from './show-lead';

const Funnel = ({ column, leads, handleCreatingColumn, funnelIndex, activeCardStatus, fetchData }) => {
    const { t } = useTranslation();

    const titleInputElement = useRef(null);

    const { setNodeRef, isOver } = useDroppable({ id: column.id });

    const [selectedLead, setSelectedLead] = useState(null);

    const [openCanvas, setOpenCanvas] = useState(false);
    const toggleCanvas = (lead) => {
        if (lead) {
            setSelectedLead(lead);
        } else {
            setSelectedLead(null);
        }
        setOpenCanvas((p) => !p);
    };

    const layoutModeType = useLayoutStore((state) => state.layoutModeType);

    const [isScheduled, setIsScheduled] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleDeleteModal = () => setShowDeleteModal((p) => !p);

    const [curFunnel, setCurFunnel] = useState({ ...column });

    const [isEditing, setIsEditing] = useState(!!column?.isEditing);
    const toggleEditing = () => funnelIndex !== 0 && setIsEditing((p) => !p);

    // sms modal
    const [smsModal, setSmsModal] = useState(false);
    const openSmsModal = () => setSmsModal(true);
    const closeSmsModal = () => setSmsModal(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const changeFunnel = (name, value) => {
        setCurFunnel((prev) => ({ ...prev, [name]: value }));
    };

    const changeMainColor = (color) => {
        changeFunnel('color', color);
        updateKanban({ color, title: curFunnel.title }, () => {
            toast.success(t('Success Updated'));
        });
    };

    const changeMainTitle = () => {
        updateKanban({ title: curFunnel.title, color: curFunnel.color }, () => {
            toggleEditing();
            toast.success(t('Success Updated'));
        });
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

    async function updateKanban(payload, cb) {
        try {
            setIsLoading(true);
            const res = await updateService(`/superadmin${KANBAN_ENDPOINT}/${curFunnel.id}`, { order: curFunnel.order, ...payload });
            if (res) {
                cb();
            }
        } catch (error) {
            onCancelEditing();
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteKanban() {
        setIsLoading(true);
        try {
            const res = await deleteService(`/superadmin${KANBAN_ENDPOINT}/${curFunnel.id}`);
            console.log({ res });
            toast.success(t('Success Deleted'));
            fetchData();
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <React.Fragment>
            <motion.div ref={setNodeRef}>
                <div className="tasks-list-content">
                    <Card
                        className={isOver ? 'tasks-list-content-over' : 'bg-light'}
                        style={{ transition: 'all 0.2s linear', borderTop: `3px solid ${curFunnel.color}` }}>
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
                                                {leads.length}
                                            </span>
                                        </div>
                                    ) : (
                                        <Input
                                            ref={titleInputElement}
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
                                        <>
                                            <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={changeMainTitle}>
                                                <i className="ri-check-fill align-middle text-success"></i>
                                            </Button>
                                            <Button size="sm" className="p-3 btn-icon btn-ghost-dark rounded-circle" onClick={onCancelEditing}>
                                                <i className="ri-close-line align-middle text-danger"></i>
                                            </Button>
                                        </>
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
                                                onClick={() => handleCreatingColumn(column)}>
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
                                                    <DropdownItem href="#" onClick={openSmsModal}>
                                                        <i className="bx bx-message-detail me-2 text-muted align-bottom"></i>
                                                        {t('Send sms')}
                                                    </DropdownItem>
                                                    {funnelIndex !== 0 && (
                                                        <DropdownItem href="#" className="text-danger" onClick={toggleDeleteModal}>
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
                                        <i className="ri-add-line align-bottom me-1"></i> {t('Add Lead')}
                                    </Button>
                                </div>
                            )}
                            <div className="border-bottom"></div>
                        </div>
                        <CardBody>
                            {column.id === -1 && (
                                <Collapse isOpen={isFormOpen}>
                                    <FunnelItemForm closeForm={closeForm} fetchData={fetchData} />
                                </Collapse>
                            )}
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
                                        // leads.map((lead) => (
                                        //     <FunnelItem key={lead.id} lead={lead} color={curFunnel.color} toggleCanvas={toggleCanvas} />
                                        // ))
                                        <AnimatePresence>
                                            {leads.map((lead) => (
                                                <FunnelItem key={lead.id} lead={lead} color={curFunnel.color} toggleCanvas={toggleCanvas} />
                                            ))}
                                        </AnimatePresence>
                                    ) : (
                                        <div className="p-3 rounded-2 border border-dashed border-dark opacity-50 text-center">
                                            <i className="mdi mdi-folder-alert-outline align-middle fs-18 me-1"></i>
                                            {t('Empty')}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </motion.div>

            <DeleteModal
                title={
                    <h4>
                        {t('Delete Kanban')} <img src={warningImage} alt="" width={30} />
                    </h4>
                }
                text={<span className="text-danger">{t('Do you want to delete this column? All information in this column will be deleted')}.</span>}
                show={showDeleteModal}
                loading={isLoading}
                onCloseClick={toggleDeleteModal}
                onDeleteClick={deleteKanban}
            />

            <Modal isOpen={smsModal} toggle={() => setSmsModal((p) => !p)} centered={true}>
                <div className="position-relative py-3">
                    <span
                        className="position-absolute fs-2"
                        style={{ top: '10px', right: '20px', cursor: 'pointer', zIndex: '999' }}
                        onClick={closeSmsModal}>
                        &times;
                    </span>
                </div>
                <ModalBody className="py-3 px-5">
                    <div className="d-flex flex-column gap-3">
                        <div className="form-check form-switch mb-3" dir="ltr">
                            <Input
                                type="checkbox"
                                className="form-check-input"
                                id="customSwitchsizesm"
                                defaultChecked={!isScheduled}
                                onChange={() => setIsScheduled((p) => !p)}
                            />
                            <Label className="form-check-label" htmlFor="customSwitchsizesm">
                                {t('Send Sms Immediately')}
                            </Label>
                        </div>
                        {isScheduled && (
                            <div>
                                <Label className="form-label">{t('Choose Time')}</Label>
                                <FormDatePicker name="date" enableTime={true} />
                            </div>
                        )}
                        <div>
                            <Label className="">{t('SMS')}</Label>
                            <textarea name="text" className="form-control no-resize" rows={5} />
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal" onClick={closeSmsModal}>
                            {t('Cancel')}
                        </button>
                        <button type="button" className="btn w-sm btn-success " id="delete-record" onClick={closeSmsModal}>
                            {t('Send')}
                        </button>
                    </div>
                </ModalBody>
            </Modal>

            {/* Off-canvas */}

            <Offcanvas isOpen={openCanvas} toggle={toggleCanvas} id="offcanvasExample" direction="end" className="offcanvas-end border-0">
                <OffcanvasHeader toggle={toggleCanvas} id="offcanvasExampleLabel" className="border-bottom">
                    {selectedLead?.name}
                </OffcanvasHeader>
                <OffcanvasBody className="verflow-hidden">
                    <ShowLead lead={selectedLead} />
                </OffcanvasBody>
                {/* <div className="offcanvas-foorter border-top p-3 text-center"></div> */}
            </Offcanvas>
        </React.Fragment>
    );
};

export default Funnel;
