import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Nav,
    NavItem,
    NavLink,
    Spinner,
    TabContent,
    TabPane,
    UncontrolledAccordion,
} from 'reactstrap';
import classnames from 'classnames';
import AudioPlayer from '../../../../Components/ui/AudioPlayer';
import audioMusic from '../../../../assets/music.mp3';
import { useTranslation } from 'react-i18next';
import { LEADS_ENDPOINT } from '../../../../helpers/url_helper';
import { getService, updateService } from '../../../../service';
import Loader from '../../../../Components/Common/Loader';
import TooltipElement from '../../../../Components/Common/Tooltip';
import LeadNotes from './lead-notes';

const ShowLead = ({ lead, toggleNotesModal }) => {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const [customActiveTab, setcustomActiveTab] = useState('1');
    const [loading, setLoading] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const toggleEditingNote = () => setIsEditingNote((p) => !p);

    const [isMore, setisMore] = useState(false);
    const toggleMore = () => setisMore((p) => !p);

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    const onChangeData = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function submitHandler(evt) {
        evt.stopPropagation();
        try {
            setLoading(true);
            await updateService(`${LEADS_ENDPOINT}/${lead.id}`, data);
            toggleEditingNote();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setData(lead);
        return () => {
            setData(null);
        };
    }, [lead]);
    return data ? (
        <div>
            <div className="d-flex mb-2 align-items-center">
                <h5 className="fs-15 mb-0 flex-grow-1 text-truncate task-title">
                    <span className="text-body">{data.name}</span>
                </h5>
            </div>
            <div className="mb- d-flex flex-column gap-1">
                {data.phones?.map((phone, index) => (
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

                <div className="my-2 more-text" onDoubleClick={toggleEditingNote}>
                    {isEditingNote ? (
                        <div>
                            <textarea className="form-control" value={data.note} name="note" onChange={onChangeData} rows="5"></textarea>
                            <Button className="d-block ms-auto mt-2" size="sm" onClick={submitHandler}>
                                <div className="d-flex align-items-center gap-2">
                                    {loading ? <Spinner size="sm" /> : <i className="ri-save-2-line"></i>} {t('Save')}
                                </div>
                            </Button>
                        </div>
                    ) : data.note?.length > 140 ? (
                        <>
                            <span className={isMore ? '' : 'text-truncate-two-lines'}>{data.note}</span>
                            <div className="text-primary text-end">
                                <span className="cursor-pointer" onClick={toggleMore}>
                                    {isMore ? (
                                        <>
                                            {t('Less')} <i className="ri-arrow-up-s-line align-middle"></i>
                                        </>
                                    ) : (
                                        <>
                                            {t('More')} <i className="ri-arrow-down-s-line align-middle"></i>
                                        </>
                                    )}
                                </span>
                            </div>
                        </>
                    ) : (
                        <span>{data.note}</span>
                    )}
                </div>
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
                    <AudioPlayer src={data.id ? audioMusic : null} />
                </TabPane>
                <TabPane tabId="2">
                    <LeadNotes lead={lead} toggleNotesModal={toggleNotesModal} />
                </TabPane>
            </TabContent>
        </div>
    ) : null;
};

export default ShowLead;
