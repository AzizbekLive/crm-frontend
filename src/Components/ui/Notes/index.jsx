import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row, Table, Spinner, Collapse } from 'reactstrap';
import TooltipElement from '../../Common/Tooltip';
import EmptyData from '../../Common/EmptyData';
import { useTranslation } from 'react-i18next';
import Paginations from '../../DataTable/Pagination';
import { getService, postService } from '../../../service';
import { NOTES_ENDPOINT } from '../../../helpers/url_helper';
import NoteItem from './NoteItem';

const initialFilter = {
    search: '',
    status: [],
    page: 1,
    pageSize: 10,
};

const Notes = ({}) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const toggleCreating = () => setIsCreating((p) => !p);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const toggleCreate = () => setIsOpenCreate((p) => !p);

    const [newQuestion, setNewQuestion] = useState('');
    const onChangeNewQuestion = (e) => setNewQuestion(e.target.value);

    const [filter, setFilter] = useState({ ...initialFilter });
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
    });

    const onChangeFilter = (name, value) => {
        const newValue = { [name]: value };
        setFilter((prev) => ({
            ...prev,
            ...newValue,
        }));
    };

    const fetchData = useCallback(
        async (params = {}) => {
            setLoading(true);
            try {
                const res = await getService(NOTES_ENDPOINT, params);
                setData(res);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
        [filter]
    );
    const onCancelCreate = () => {
        setNewQuestion('');
        toggleCreate();
    };
    const onSaveHandler = async () => {
        if (newQuestion.trim() === '') return;
        try {
            toggleCreating();
            const res = await postService(NOTES_ENDPOINT, { text: newQuestion });

            if (res) {
                setNewQuestion('');
                fetchData();
            }
        } catch (error) {
        } finally {
            toggleCreating();
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSaveHandler();
        }
    };
    const removeItem = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Row>
            <Col sm={12}>
                <div className="border-bottom-0 pb-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="col-lg-3 col-auto">
                            <Input value={filter.search} name="search" onChange={onChangeFilter} placeholder="Search" />
                        </div>
                        <div className="col-auto">
                            <Button color="success" onClick={toggleCreate} disabled={isCreating}>
                                <i className="ri-add-fill align-middle"></i> {t('Create')}
                            </Button>
                        </div>
                    </div>
                </div>
                <Collapse isOpen={isOpenCreate} className="my-2">
                    <div className="d-flex gap-2 align-items-start">
                        <Input
                            value={newQuestion}
                            onChange={onChangeNewQuestion}
                            className="w-100"
                            placeholder={t('Enter question') + '...'}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="d-flex gap-1">
                            <TooltipElement tooltipText={t('Cancel')}>
                                <Button className="btn-soft-secondary btn-icon" color="secondary" onClick={onCancelCreate} disabled={isCreating}>
                                    <i className="ri-close-fill" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                            <TooltipElement tooltipText={t('Save')}>
                                <Button className="btn-soft-success btn-icon" color="success" onClick={onSaveHandler} disabled={isCreating}>
                                    <i className="ri-check-line" style={{ transform: 'scale(1.2)' }}></i>
                                </Button>
                            </TooltipElement>
                        </div>
                    </div>
                </Collapse>
                <div className="mb-0">
                    <Table className="align-middle table-sm" hover>
                        <thead className="table-light text-muted">
                            <tr>
                                <th className="fw-bold">№</th>
                                <th className="fw-bold">{t('Question')}</th>
                                <th className="fw-bold text-end"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="py-5 text-center">
                                            <Spinner />
                                        </div>
                                    </td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((item, index) => <NoteItem key={item.id} item={item} index={index} removeItem={removeItem} />)
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="py-5 text-center">
                                            <EmptyData size="md" />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {/* <Paginations
                            page={pagination.page}
                            totalItems={pagination.total}
                            itemsPerPage={filter.pageSize}
                            perPageChange={(val) => setFilter((prev) => ({ ...prev, pageSize: val }))}
                            currentPage={(val) => setFilter((prev) => ({ ...prev, page: val }))}
                        /> */}
            </Col>
        </Row>
    );
};

export default Notes;
