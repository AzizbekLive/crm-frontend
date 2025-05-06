import React, { useEffect, useMemo, useState } from 'react';
import avatar from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import { Button, Card, CardBody, Input, Label, Modal, ModalBody, Spinner } from 'reactstrap';
import TooltipElement from '../../../Components/Common/Tooltip';
import Funnel from './funnel';
import SearchOptions from './search-options';
import { DndContext } from '@dnd-kit/core';
import { getService, postService, updateService } from '../../../service';
import { KANBAN_ENDPOINT, LEADS_ENDPOINT } from '../../../helpers/url_helper';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EmptyData from '../../../Components/Common/EmptyData';
import { toast } from 'sonner';
import { Sketch } from '@uiw/react-color';
import './style.css';

export const INITIAL_COLUMNS = [
    {
        title: 'New Leads',
        color: '#2E90FA',
        counts: 2,
        id: -1,
        order: -1,
    },
];

const index = () => {
    const { t } = useTranslation();

    const [columns, setColumns] = useState([]);
    const [selectedKanban, setSelectedKanban] = useState(null);
    const [color, setColor] = useState('#000');
    const [leads, setLeads] = useState([]);

    const [createKanbanModal, setCreateKanbanModal] = useState(false);
    const toggleCreateKanbanModal = () => setCreateKanbanModal((p) => !p);

    const groupedLeads = useMemo(() => {
        return leads.reduce((acc, lead) => {
            if (!acc[lead.kanbanId]) acc[lead.kanbanId] = [];
            acc[lead.kanbanId].unshift(lead);
            return acc;
        }, {});
    }, [leads]);

    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [activeCardStatus, setActiveCardStatus] = useState(null);

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        const leadId = active.id;
        const newKanbanId = over.id;

        const curLead = leads.find((lead) => lead.id === leadId);

        if (curLead.kanbanId === newKanbanId) return;

        setLeads((prevLeads) => {
            const leadIndex = prevLeads.findIndex((lead) => lead.id === leadId);
            if (leadIndex === -1) return prevLeads;

            const updatedLead = {
                ...prevLeads[leadIndex],
                kanbanId: newKanbanId,
                loading: true,
            };

            // eski massivdan o‘chiramiz
            const filteredLeads = prevLeads.filter((lead) => lead.id !== leadId);

            // yangilangan leadni massiv boshiga qo‘shamiz
            return [...filteredLeads, updatedLead];
        });

        updateLead({ newKanbanId, leadId }, () => {
            setLeads((prevLeads) => {
                const newLeads = prevLeads.map((lead) => (lead.id === leadId ? { ...lead, kanbanId: newKanbanId, loading: false } : lead));
                return newLeads;
            });
        });

        setActiveCardStatus(null);
    }

    function handleDragStart(event) {
        const { active } = event;
        const activeCard = leads.find((lead) => active.id === lead.id);
        setActiveCardStatus(activeCard.kanbanId);
    }

    const handleCreatingColumn = (column) => {
        setSelectedKanban(column);
        toggleCreateKanbanModal();
    };

    const onSubmitCreateKanban = (evt) => {
        evt.preventDefault();
        const fd = new FormData(evt.target);

        const data = Object.fromEntries(fd.entries());

        data.color = color;
        data.order = selectedKanban.order + 1;

        createKanban(data, () => {
            fetchData();
            toggleCreateKanbanModal();
        });
    };

    async function getKanbanList() {
        setLoading(true);
        try {
            const res = await getService(KANBAN_ENDPOINT);
            console.log({ res });
            setColumns(() => [...INITIAL_COLUMNS, ...res]);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    async function getLeadsList() {
        setLoading(true);
        try {
            const { leads } = await getService(LEADS_ENDPOINT);
            console.log({ leads });
            setLeads(leads);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    async function updateLead({ newKanbanId, leadId }, cb) {
        try {
            const res = await updateService(`${LEADS_ENDPOINT}/${leadId}`, {
                kanbanId: newKanbanId,
            });
            if (res) {
                cb();
            }
        } catch (error) {}
    }

    async function createKanban(payload, cb) {
        try {
            setSubmitLoading(true);
            const res = await postService(`/superadmin${KANBAN_ENDPOINT}/create`, payload);
            if (res) {
                cb(res.id);
                toast.success(t('Success Created'));
            }
        } catch (error) {
            console.log('error');

            cb(false);
        } finally {
            setSubmitLoading(false);
        }
    }

    function fetchData() {
        getKanbanList();
        getLeadsList();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="row g-2">
                        <div className="col-lg-3 col-auto">
                            <SearchOptions onInitialChange={() => {}} />
                        </div>
                        <div className="col-auto ms-sm-auto">
                            <div className="d-flex align-items-center gap-2">
                                <div className="avatar-group" id="newMembar">
                                    <TooltipElement tooltipText={'Alexis'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar} alt="" className="rounded-circle avatar-xs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Anna'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar2} alt="" className="rounded-circle avatar-xs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Alexis'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar3} alt="" className="rounded-circle avatar-xs" />
                                        </div>
                                    </TooltipElement>
                                    <TooltipElement tooltipText={'Anna'}>
                                        <div className="avatar-group-item">
                                            <img src={avatar4} alt="" className="rounded-circle avatar-xs" />
                                        </div>
                                    </TooltipElement>
                                </div>
                                <Button type="button" color="primary" className="me-2">
                                    <i className="ri-edit-line me-1 align-bottom" />
                                    {t('Edit')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-top my-4"></div>
                    <div className=" mb-3" id="kanbanboard">
                        {loading ? (
                            <div className="d-flex justify-content-center w-100 py-5">
                                <Spinner />
                            </div>
                        ) : columns.length === 0 ? (
                            <EmptyData title={t('No Data')} text=" " />
                        ) : (
                            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                                <motion.div className="tasks-board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                    {columns
                                        .sort((a, b) => a.order - b.order)
                                        .map((column, index) => (
                                            <Funnel
                                                key={column.id}
                                                funnelIndex={index}
                                                column={column}
                                                leads={groupedLeads[column.id] || []}
                                                setLeads={setLeads}
                                                handleCreatingColumn={handleCreatingColumn}
                                                activeCardStatus={activeCardStatus}
                                                fetchData={fetchData}
                                            />
                                        ))}
                                </motion.div>
                            </DndContext>
                        )}
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={createKanbanModal} toggle={toggleCreateKanbanModal} centered={true}>
                <div className="position-relative py-3">
                    <span
                        className="position-absolute fs-2"
                        style={{ top: '10px', right: '20px', cursor: 'pointer', zIndex: '999' }}
                        onClick={toggleCreateKanbanModal}>
                        &times;
                    </span>
                </div>
                <ModalBody>
                    <form action="" onSubmit={onSubmitCreateKanban}>
                        <div className="d-flex flex-column gap-3">
                            <div>
                                <Label className="form-label" htmlFor="customSwitchsizesm">
                                    {t('Title')}
                                </Label>
                                <Input type="text" name="title" />
                            </div>
                            <div>
                                <Label className="form-label" htmlFor="customSwitchsizesm">
                                    {t('Color')}
                                </Label>
                                <Sketch color={color} onChange={(color) => setColor(color.hex)} />
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-end mt-4 mb-2">
                            <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal" onClick={toggleCreateKanbanModal}>
                                {t('Cancel')}
                            </button>
                            <button type="submit" className="btn w-sm btn-success " id="delete-record" disabled={submitLoading}>
                                {submitLoading && <Spinner size="sm" className="me-1" />}
                                {t('Create')}
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default index;
