import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import TooltipElement from '../../Common/Tooltip';
import { useTranslation } from 'react-i18next';
import { deleteService, updateService } from '../../../service';
import { NOTES_ENDPOINT } from '../../../helpers/url_helper';
const NoteItem = ({ item, index, removeItem }) => {
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const toggleEditing = () => setIsEditing((p) => !p);
    const [isLoading, setIsLoading] = useState(false);

    const [note, setNote] = useState(item);

    useEffect(() => {
        setNote(item);
        console.log({ item });
    }, [item]);

    const cancelEditing = () => {
        setIsEditing(false);
        setNote(item);
    };

    const saveHandler = async () => {
        if (note.text.trim() === '') return;
        try {
            setIsLoading(true);
            const res = await updateService(`${NOTES_ENDPOINT}/${note.id}`, { ...note });
            setIsEditing(false);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            saveHandler();
        }
    };

    const deleteHandler = async () => {
        try {
            setIsLoading(true);
            const res = await deleteService(`${NOTES_ENDPOINT}/${note.id}`);
            removeItem(note.id);
            setIsEditing(false);
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {}, []);

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                {isEditing ? (
                    <div className="d-flex gap-2 align-items-start">
                        <Input
                            name="text"
                            value={note.text}
                            onChange={(e) => setNote((p) => ({ ...p, [e.target.name]: e.target.value }))}
                            className="w-75"
                            onKeyDown={handleKeyDown}
                        />
                        <div className="d-flex gap-1">
                            <TooltipElement tooltipText={t('Cancel')}>
                                <Button className="btn-soft-secondary btn-icon" onClick={cancelEditing} color="secondary">
                                    <i className="ri-close-fill" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                            <TooltipElement tooltipText={t('Save')}>
                                <Button className="btn-soft-success btn-icon" onClick={saveHandler} color="success" disabled={isLoading}>
                                    <i className="ri-check-line" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                        </div>
                    </div>
                ) : (
                    <span onDoubleClick={toggleEditing}>{note?.text}</span>
                )}
            </td>

            <td className="text-end">
                <div className="d-flex gap-1 justify-content-center">
                    <TooltipElement tooltipText={t('Delete')}>
                        <Button className="btn-soft-danger btn-icon btn-sm" color="danger" disabled={isLoading} onClick={deleteHandler}>
                            <i className="ri-delete-bin-6-line" style={{ transform: 'scale(1.2)' }}></i>
                        </Button>
                    </TooltipElement>
                </div>
            </td>
        </tr>
    );
};

export default NoteItem;
