import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Input, Label, Nav, NavItem, NavLink, Row, Table, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import TooltipElement from '../../Components/Common/Tooltip';
import SearchOptions from '../Leads/kanban/search-options';
import EmptyData from '../../Components/Common/EmptyData';
import FormCheckbox from '../../Components/Form/FormCheckbox';
import { getService } from '../../service';
import { CLIENTS_ENDPOINT } from '../../helpers/url_helper';
import { useTranslation } from 'react-i18next';

const initialFilter = {
    search: '',
    status: [],
};

const AllClients = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState([]);
    const [clients, setClients] = useState([]);

    const [filter, setFilter] = useState({ ...initialFilter });
    const onFilterChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'search') {
            setFilter((prev) => ({ ...prev, search: value }));
        } else if (name === 'status') {
            setFilter((prev) => {
                const exists = prev.status.includes(value);
                const updatedStatus = exists ? prev.status.filter((item) => item !== value) : [...prev.status, value];
                return {
                    ...prev,
                    status: updatedStatus,
                };
            });
        }
    };

    const isEmptyFilter = useCallback(() => {
        if (filter.search === '' && filter.status.length === 0) return true;
        return false;
    }, [filter]);

    const viewClient = (id) => {
        navigate(`/clients/${id}`);
    };

    const getClientsList = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getService(CLIENTS_ENDPOINT, filter);
            console.log({ res });
            setClients(res);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        getClientsList();
    }, [getClientsList]);

    return (
        <Row>
            <Col sm={12}>
                {/* {loading ? (
                    <div className="py-5 text-center">
                        <Spinner />
                    </div>
                ) : clients.length > 0 ? (
                    
                ) : (
                    <EmptyData />
                )} */}
                <Card>
                    <CardHeader className="border-bottom-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="col-lg-3 col-auto">
                                <SearchOptions initialValue={filter.search} onInitialChange={onFilterChange} />
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <FormCheckbox value="debtors" label="Debtors" name="status" onChange={onFilterChange} />
                                <FormCheckbox value="fixed_payment" label="Fixed payment" name="status" onChange={onFilterChange} />
                                <FormCheckbox value="mortgage" label="Mortgage" name="status" onChange={onFilterChange} />
                                {!isEmptyFilter() && (
                                    <Button type="button" color="primary" outline>
                                        <i className="bx bx-refresh me-1 align-middle fs-5" />
                                        {t('Clear')}
                                    </Button>
                                )}
                                <Button type="button" color="success">
                                    <i className="ri-add-line me-1 align-bottom" />
                                    Create New User
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="p-0">
                        <div className="mb-0">
                            <Table className="mb-0 align-middle" hover>
                                <thead className="table-light text-muted">
                                    <tr>
                                        <th className="fw-bold">#</th>
                                        <th className="fw-bold">{t('Full Name')}</th>
                                        <th className="fw-bold">{t('Attached Apartment')}</th>
                                        <th className="fw-bold">{t('Paid')}</th>
                                        <th className="fw-bold">{t('Status')}</th>
                                        <th className="fw-bold">{t('Contract')}</th>
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
                                    ) : clients.length > 0 ? (
                                        clients.map((client, index) => (
                                            <tr key={client.id}>
                                                <td>{index + 1}</td>
                                                <td>{client.name}</td>
                                                <td>
                                                    <div>
                                                        <span className="d-block">3 rooms, 80 m.kv</span>
                                                        <span className="d-block fs-13 text-muted">3/30, 5th floor</span>
                                                    </div>
                                                </td>
                                                <td>500 000 000 sum / 1 000 000 000 sum</td>
                                                <td>To’langan</td>
                                                <td>N-001.pdf</td>
                                                <td className="text-end">
                                                    <div className="d-flex gap-1 justify-content-end">
                                                        <TooltipElement tooltipText={'Download contract'}>
                                                            <Button className="btn-soft-primary btn-icon">
                                                                <i className="ri-download-cloud-2-line" style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement>
                                                        <TooltipElement tooltipText={'Chat'}>
                                                            <Button className="btn-soft-warning btn-icon">
                                                                <i
                                                                    className="mdi mdi-chat-processing-outline"
                                                                    style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement>
                                                        <TooltipElement tooltipText={'View Client'}>
                                                            <Button className="btn-soft-secondary btn-icon" onClick={() => viewClient(1)}>
                                                                <i className="mdi mdi-eye" style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <EmptyData />
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AllClients;
