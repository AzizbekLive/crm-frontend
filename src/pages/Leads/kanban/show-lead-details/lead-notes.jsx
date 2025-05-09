import React, { useEffect, useState } from 'react';
import { Button, Card } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { getService } from '../../../../service';
import { LEADS_ENDPOINT } from '../../../../helpers/url_helper';
import Loader from '../../../../Components/Common/Loader';
import NoteItem from './note-item';
const LeadNotes = ({ lead, toggleNotesModal }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [notes, setNotes] = useState([]);

    const fetchNotesCurrentLead = async () => {
        try {
            setLoading(true);
            const res = await getService(`${LEADS_ENDPOINT}/${lead.id}/notes`);
            console.log({ res });

            setNotes(res);
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
                        <NoteItem note={note} key={note.id} lead={lead} />
                    ))}
                </Card>
            )}
        </div>
    );
};

export default LeadNotes;
