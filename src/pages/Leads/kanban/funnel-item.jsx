import React from 'react';
import { CardBody, CardFooter, Spinner } from 'reactstrap';
import avatar from '../../../assets/images/users/user-avatar.png';
import { decreaseColor } from '../../../helpers/methods';
import { useDraggable } from '@dnd-kit/core';
import { formatDate } from '@fullcalendar/core/index.js';
// import { formatDate } from '@fullcalendar/core/index.js';
const FunnelItem = ({ color, lead, toggleCanvas }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: lead.id });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px) rotate(3deg)`,
              zIndex: 9999,
          }
        : undefined;

    const openLead = () => {
        toggleCanvas(lead);
    };
    return (
        <div className="card tasks-box shadow-md" ref={setNodeRef} style={style} {...attributes} {...listeners} onDoubleClick={openLead}>
            <CardBody>
                <div className="d-flex mb-2 align-items-center">
                    <h5 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                        <span className="text-body">{lead.name}</span>
                    </h5>
                </div>
                <div className="mb- d-flex flex-column gap-1">
                    {lead.phones.map((phone, index) => (
                        <div className="d-flex" key={phone + index}>
                            <div className="d-flex gap-2 align-items-center">
                                <i className="ri-phone-line align-bottom fs-18"></i>
                                <span>{phone}</span>
                            </div>
                        </div>
                    ))}
                    {lead.addresses?.map((address, index) => (
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
                            <span>{lead.address}</span>
                        </div>
                    </div> */}
                </div>
            </CardBody>
            <CardFooter className="py-2 border-top-dashed">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <span className="badge rounded-pill fs-12" style={{ backgroundColor: decreaseColor(color), color: color }}>
                            <i className="ri-time-line align-bottom"></i>{' '}
                            {formatDate(lead.date, {
                                month: 'numeric',
                                year: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'Asia/Tashkent',
                                locale: 'uz',
                                hour12: false,
                            })}
                        </span>
                    </div>
                    <div className="flex-shrink-0">
                        {/* <TooltipElement tooltipText={lead.name}> */}
                        <div className="avatar-group-item">
                            {lead?.loading ? <Spinner size={'sm'} /> : <img src={avatar} alt="" className="rounded-circle avatar-xxs" />}
                        </div>
                        {/* </TooltipElement> */}
                    </div>
                </div>
            </CardFooter>
        </div>
    );
};

export default FunnelItem;
