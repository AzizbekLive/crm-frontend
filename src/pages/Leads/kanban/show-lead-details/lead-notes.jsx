import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    ListGroup,
    ListGroupItem,
    UncontrolledAccordion,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { getService } from '../../../../service';
import { LEADS_ENDPOINT } from '../../../../helpers/url_helper';
import Loader from '../../../../Components/Common/Loader';
import TooltipElement from '../../../../Components/Common/Tooltip';
import NoteItem from './note-item';
const LeadNotes = ({ lead, toggleNotesModal }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [notes, setNotes] = useState([
        {
            questionId: 2,
            question: 'When are you planning to move in? ',
        },
        {
            questionId: 4,
            question: 'Will you be financing through a mortgage or paying upfront?',
        },
        {
            questionId: 6,
            question: 'How many bedrooms and bathrooms do you need?',
        },
        {
            questionId: 7,
            question: 'Do you need to be close to schools, public transport, or your workplace?',
        },
        {
            questionId: 12,
            question: 'What amenities are important to you? (e.g., parking, gym, pool, security)',
        },
        {
            questionId: 13,
            question: 'Do you need a pet-friendly building?',
        },
        {
            questionId: 16,
            question: 'Do you need to be close to schools, public transport, or your workplace?',
        },
    ]);
    const [noteIdList, setNoteIdList] = useState([]);

    const fetchNotesCurrentLead = async () => {
        try {
            setLoading(true);
            const res = await getService(`${LEADS_ENDPOINT}/${lead.id}/notes`);
            console.log({ res });

            setNotes(res);
            setNoteIdList(res.map((note) => note.questionId));
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lead?.id) {
            fetchNotesCurrentLead();
        }
    }, [lead?.id]);

    return (
        <div>
            <div className="my-2 d-flex justify-content-end gap-2">
                <Button className="d-flex align-items-center gap-1" color="primary" outline onClick={toggleNotesModal}>
                    <i className="ri-settings-3-line align-middle"></i> {t('Questions Settings')}
                </Button>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <Card className="mb-0">
                    {notes.map((note) => (
                        <NoteItem note={note} key={note.id} />
                    ))}
                </Card>
            )}
        </div>
    );
};

export default LeadNotes;
