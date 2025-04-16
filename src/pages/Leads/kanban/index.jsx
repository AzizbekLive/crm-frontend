import React, { useEffect, useMemo, useState } from 'react';
import avatar from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import { Button, Card, CardBody, Offcanvas, OffcanvasBody, OffcanvasHeader, Spinner } from 'reactstrap';
import TooltipElement from '../../../Components/Common/Tooltip';
import Funnel from './funnel';
import SearchOptions from './search-options';
import './style.css';
import { DndContext } from '@dnd-kit/core';
import { getService, postService, updateService } from '../../../service';
import { KANBAN_ENDPOINT, LEADS_ENDPOINT } from '../../../helpers/url_helper';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EmptyData from '../../../Components/Common/EmptyData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const INITIAL_COLUMNS = [
    {
        title: 'New Leads',
        color: '#2E90FA',
        counts: 2,
        id: -1,
    },
];

const INITIAL_LEADS = [
    {
        id: 1,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar,
        status: 'NEW_LEADS',
    },
    {
        id: 2,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar2,
        status: 'CALLED',
    },
    {
        id: 3,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar3,
        status: 'CAME_TO_THE_OFFICE',
    },
    {
        id: 4,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar2,
        status: 'CAME_TO_THE_OFFICE',
    },
    {
        id: 5,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar,
        status: 'CONTRACTS',
    },
    {
        id: 6,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar2,
        status: 'CONTRACTS',
    },
    {
        id: 7,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar3,
        status: 'CONTRACTS',
    },
    {
        id: 8,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar,
        status: 'CALLED',
    },
    {
        id: 9,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar,
        status: 'CONTRACTS',
    },
    {
        id: 10,
        name: 'Farrux Aktamov',
        phones: ['+998 99 999 99 99', '+998 99 999 99 99'],
        address: 'Tashkent, Yangihayat',
        date: '01.01.2025',
        image: avatar2,
        status: 'NEW_LEADS',
    },
];

const index = () => {
    const { t } = useTranslation();

    const [columns, setColumns] = useState([]);
    const [leads, setLeads] = useState([]);
    const [openCanvas, setOpenCanvas] = useState(false);
    const toggleCanvas = () => setOpenCanvas((p) => !p);

    const groupedLeads = useMemo(() => {
        return leads.reduce((acc, lead) => {
            if (!acc[lead.kanbanId]) acc[lead.kanbanId] = [];
            acc[lead.kanbanId].unshift(lead);
            return acc;
        }, {});
    }, [leads]);

    const [loading, setLoading] = useState(false);

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

    const handleCreatingColumn = (columnId) => {
        const currentColumnIndex = columns.findIndex((column) => column.id === columnId);
        const newColumn = {
            title: '',
            color: '',
            order: columns[currentColumnIndex].order + 10,
            createdAt: 0,
        };
        const newColumns = [...columns];

        newColumns.splice(currentColumnIndex + 1, 0, newColumn);
        setColumns(newColumns);
        // createKanban(newColumn, (id) => {
        //     if (id) {

        //     } else {

        //     }
        // });
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
            const res = await postService(`/superadmin${KANBAN_ENDPOINT}/create`, payload);
            if (res) {
                cb(res.id);
            }
        } catch (error) {
            console.log('error');

            cb(false);
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
                                                key={index}
                                                funnelIndex={index}
                                                column={column}
                                                leads={groupedLeads[column.id] || []}
                                                setLeads={setLeads}
                                                handleCreatingColumn={handleCreatingColumn}
                                                activeCardStatus={activeCardStatus}
                                                fetchData={fetchData}
                                                toggleCanvas={toggleCanvas}
                                            />
                                        ))}
                                </motion.div>
                            </DndContext>
                        )}
                    </div>
                </CardBody>
            </Card>

            {/* Off-canvas */}

            <Offcanvas isOpen={openCanvas} toggle={toggleCanvas} id="offcanvasExample" direction="end" className="offcanvas-end border-0">
                <OffcanvasHeader toggle={toggleCanvas} id="offcanvasExampleLabel" className="border-bottom">
                    Recent Acitivity
                </OffcanvasHeader>
                <OffcanvasBody className="p-0 overflow-hidden">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, fugit repellat! Voluptatum aliquam autem consequatur sed?
                    Laborum expedita iste pariatur error dicta facere, non ratione rem? Sequi cupiditate doloremque mollitia totam voluptatibus
                    recusandae laborum sint perspiciatis qui beatae incidunt labore vero asperiores explicabo, aliquam sed! Architecto quis beatae
                    molestiae atque sequi, ipsam neque optio laboriosam id ea perferendis porro nulla nemo numquam obcaecati ex ut tempora nobis
                    soluta, officia quae. Pariatur laboriosam voluptatibus, aliquam ducimus quasi vero nisi eum maxime, possimus quibusdam iusto non
                    sed tenetur porro distinctio atque fugiat minus consequatur? Accusantium soluta sequi, rem sapiente recusandae pariatur
                    praesentium.
                </OffcanvasBody>
                <div className="offcanvas-foorter border-top p-3 text-center">
                    <Link to="#" className="link-success">
                        View All Acitivity <i className="ri-arrow-right-s-line align-middle ms-1"></i>
                    </Link>
                </div>
            </Offcanvas>
        </div>
    );
};

export default index;
