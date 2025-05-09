import React, { useEffect, useState } from 'react';
import { Button, CardBody, CardHeader, Input } from 'reactstrap';
import TooltipElement from '../../../../Components/Common/Tooltip';
import { useTranslation } from 'react-i18next';
import { LEADS_ENDPOINT } from '../../../../helpers/url_helper';
import { updateService } from '../../../../service';
const NoteItem = ({ note, lead }) => {
    const { t } = useTranslation();

    const [currentNote, setCurrentNote] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const toggleEditingNote = () => setIsEditingNote((p) => !p);
    const cancelEditing = () => {
        setIsEditingNote(false);
        setCurrentNote(note);
    };
    const saveHandler = async () => {
        setIsSubmitting(true);
        console.log({ note });
        try {
            const res = await updateService(`${LEADS_ENDPOINT}/${lead.id}/notes/${note.questionId}`, { answer: currentNote.answer });
            if (res) {
                setIsEditingNote(false);
            }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            saveHandler();
        }
    };

    useEffect(() => {
        setCurrentNote(note);
    }, [note]);

    return currentNote ? (
        <div>
            <CardHeader className="bg-light border py-2">
                <div className="text-dark">{currentNote.question}</div>
            </CardHeader>
            <CardBody className="">
                {isEditingNote ? (
                    <div className="d-flex gap-2">
                        <Input
                            name="text"
                            className="w-100"
                            value={currentNote.answer}
                            onChange={(e) => setCurrentNote({ ...currentNote, answer: e.target.value })}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="d-flex gap-1">
                            <TooltipElement tooltipText={t('Cancel')}>
                                <Button className="btn-soft-secondary btn-icon" onClick={cancelEditing} color="secondary">
                                    <i className="ri-close-fill" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                            <TooltipElement tooltipText={t('Save')}>
                                <Button
                                    className="btn-soft-success btn-icon"
                                    onClick={saveHandler}
                                    color="success"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}>
                                    <i className="ri-check-line" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                        </div>
                    </div>
                ) : (
                    <div className="" onDoubleClick={toggleEditingNote}>
                        {currentNote.answer ? (
                            <span className="text-dark">
                                <i className="ri-check-line text-success align-middle fs-18 me-2"></i>
                                {currentNote.answer}
                            </span>
                        ) : (
                            <span className="text-muted fst-italic">
                                <i className="ri-close-line text-danger align-middle fs-18 me-2"></i> {t('No Answer')}
                            </span>
                        )}
                    </div>
                )}
            </CardBody>
        </div>
    ) : null;
};

export default NoteItem;
