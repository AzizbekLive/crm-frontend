import React, { useState } from 'react';
import avatar from '../../../assets/images/users/avatar-1.jpg';
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import avatar3 from '../../../assets/images/users/avatar-3.jpg';
import avatar4 from '../../../assets/images/users/avatar-4.jpg';
import { Button, Card, CardBody } from 'reactstrap';
import TooltipElement from '../../../Components/Common/Tooltip';
import Funnel from './funnel';
import SearchOptions from './search-options';
import './style.css';
import { DndContext } from '@dnd-kit/core';
import DeleteModal from '../../../Components/Common/DeleteModal';

const INITIAL_COLUMNS = [
    {
        title: 'New Leads',
        color: '#2E90FA',
        counts: 2,
        id: 'NEW_LEADS',
    },
    {
        title: 'Called',
        color: '#5925DC',
        counts: 3,
        id: 'CALLED',
    },
    {
        title: 'Came to the office',
        color: '#B54708',
        counts: 4,
        id: 'CAME_TO_THE_OFFICE',
    },
    {
        title: 'Contracts',
        color: '#027A48',
        counts: 2,
        id: 'CONTRACTS',
    },
    {
        title: 'Others',
        color: '#FF00AE',
        counts: 0,
        id: 'OTHERS',
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
    const [columns, setColumns] = useState(INITIAL_COLUMNS);
    const [leads, setLeads] = useState(INITIAL_LEADS);

    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const toggleDeleteModal = (column) => {
        if (column) {
            setSelectedColumn(column);
        }
        setIsDeleting((p) => !p);
    };

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over) return;

        const leadId = active.id;
        const newStatus = over.id;

        setLeads((prevLeads) => {
            const newLeads = prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead));
            return newLeads;
        });
    }

    const handleCreatingColumn = (columnId) => {
        // create a random string consists of 5 digits, e.g. "12345"
        const randomStr = Math.floor(Math.random() * 100000).toString();
        const newColumn = {
            title: '',
            color: '',
            counts: 0,
            id: `column-${columnId}-${randomStr}`,
            isEditing: true,
        };
        const newColumns = [...columns];
        const currentIndex = columns.findIndex((column) => column.id === columnId);
        newColumns.splice(currentIndex + 1, 0, newColumn);
        setColumns(newColumns);
    };

    const deleteColumn = () => {
        const newColumns = columns.filter((column) => column.id !== selectedColumn?.id);
        setColumns(newColumns);
        setIsDeleting(false);
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <div className="row g-2">
                        <div className="col-lg-3 col-auto">
                            <SearchOptions />
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
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-top my-4"></div>
                    <div className="tasks-board mb-3" id="kanbanboard">
                        <DndContext onDragEnd={handleDragEnd}>
                            {columns.map((column, index) => (
                                <Funnel
                                    key={index}
                                    column={column}
                                    leads={leads.filter((lead) => lead.status === column.id)}
                                    setLeads={setLeads}
                                    toggleDelete={toggleDeleteModal}
                                    handleCreatingColumn={handleCreatingColumn}
                                />
                            ))}
                        </DndContext>
                    </div>
                </CardBody>
            </Card>

            <DeleteModal
                title={'Delete Column'}
                text="Do you want to delete this column? All information in this column will be deleted."
                show={isDeleting}
                onCloseClick={toggleDeleteModal}
                onDeleteClick={deleteColumn}
            />
        </div>
    );
};

export default index;
