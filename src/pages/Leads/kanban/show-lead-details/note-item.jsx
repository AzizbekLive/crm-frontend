import React, { useState } from 'react';
import { Button, CardBody, CardHeader, Input } from 'reactstrap';
import TooltipElement from '../../../../Components/Common/Tooltip';
import { useTranslation } from 'react-i18next';
const NoteItem = ({ note }) => {
    const { t } = useTranslation();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const toggleEditingNote = () => setIsEditingNote((p) => !p);
    const cancelEditing = () => {
        setIsEditingNote(false);
    };
    const saveHandler = async () => {
        setIsEditingNote(false);
    };
    return note ? (
        <div>
            <CardHeader className="bg-light border py-2">
                <div className="text-dark">{note.question}</div>
            </CardHeader>
            <CardBody className="">
                {isEditingNote ? (
                    <div className="d-flex gap-2">
                        <Input name="text" className="w-100" />
                        <div className="d-flex gap-1">
                            <TooltipElement tooltipText={t('Cancel')}>
                                <Button className="btn-soft-secondary btn-icon" onClick={cancelEditing} color="secondary">
                                    <i className="ri-close-fill" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                            <TooltipElement tooltipText={t('Save')}>
                                <Button className="btn-soft-success btn-icon" onClick={saveHandler} color="success" disabled={isSubmitting}>
                                    <i className="ri-check-line" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                        </div>
                    </div>
                ) : (
                    <div className="" onDoubleClick={toggleEditingNote}>
                        {note.answer || <span className="text-muted fst-italic">{t('No Answer')}</span>}
                    </div>
                )}
            </CardBody>
        </div>
    ) : null;
};

export default NoteItem;
