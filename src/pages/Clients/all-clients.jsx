import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Row, Table, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import TooltipElement from '../../Components/Common/Tooltip';
import EmptyData from '../../Components/Common/EmptyData';
import FormCheckbox from '../../Components/Form/FormCheckbox';
import { getService } from '../../service';
import { CLIENTS_ENDPOINT } from '../../helpers/url_helper';
import { useTranslation } from 'react-i18next';
import Paginations from '../../Components/DataTable/Pagination';

const initialFilter = {
    search: '',
    status: [],
    page: 1,
    pageSize: 10,
};

const AllClients = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState([]);
    const [clients, setClients] = useState([]);

    const [filter, setFilter] = useState({ ...initialFilter });
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
    });
    const onChangeFilter = (evt) => {
        const { name, value } = evt.target;

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
        } else {
            setFilter((prev) => ({ ...prev, [name]: value }));
        }
    };

    const isEmptyFilter = useCallback(() => {
        if (filter.search === '' && filter.status.length === 0) return true;
        return false;
    }, [filter]);

    const viewClient = (id) => {
        navigate(`/clients/${id}`);
    };
    const getClientsList = useCallback(
        async (params = {}) => {
            setLoading(true);
            try {
                const res = await getService(CLIENTS_ENDPOINT, { ...filter, ...params });
                if (res) {
                    const { items, ...paginationProps } = res;
                    setClients(items);
                    setPagination((prev) => ({ ...prev, ...paginationProps }));
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
        [filter]
    );

    useEffect(() => {
        getClientsList();
    }, [getClientsList]);

    return (
        <Row>
            <Col sm={12}>
                <Card>
                    <CardHeader className="border-bottom-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="col-lg-3 col-auto">
                                <Input value={filter.search} name="search" onChange={onChangeFilter} placeholder="Search" />
                            </div>
                            <div className="d-flex gap-3 align-items-center">
                                <FormCheckbox
                                    value="debtors"
                                    label="Debtors"
                                    name="status"
                                    onChange={onChangeFilter}
                                    checked={filter.status.includes('debtors')}
                                />
                                <FormCheckbox
                                    value="fixed_payment"
                                    label="Fixed payment"
                                    name="status"
                                    onChange={onChangeFilter}
                                    checked={filter.status.includes('fixed_payment')}
                                />
                                <FormCheckbox
                                    value="mortgage"
                                    label="Mortgage"
                                    name="status"
                                    onChange={onChangeFilter}
                                    checked={filter.status.includes('mortgage')}
                                />
                                {!isEmptyFilter() && (
                                    <Button type="button" color="primary" outline onClick={() => setFilter(initialFilter)}>
                                        <i className="bx bx-refresh me-1 align-middle fs-5" />
                                        {t('Clear')}
                                    </Button>
                                )}
                                {/* <Button type="button" color="success">
                                    <i className="ri-add-line me-1 align-bottom" />
                                    Create New User
                                </Button> */}
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="p-0">
                        <div className="mb-0">
                            <Table className="align-middle" hover>
                                <thead className="table-light text-muted">
                                    <tr>
                                        <th className="fw-bold">№</th>
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
                                                <td>{`${client?.firstName} ${client?.lastName}`}</td>
                                                <td>
                                                    <div>
                                                        {/* {
                                                                "id": 1,
                                                                "rooms": 3,
                                                                "totalArea": 80,
                                                                "floor": 11,
                                                                "block": 28,
                                                                "totalPrice": 1200000000,
                                                                "contractDetails": {
                                                                    "id": 1,
                                                                    "clientId": 1,
                                                                    "apartmentId": 1,
                                                                    "initialPayment": 100000000,
                                                                    "monthsDuration": 12,
                                                                    "discount": 5,
                                                                    "discountedAmount": 60000000,
                                                                    "paymentStartDate": "2024-03-20",
                                                                    "createdAt": 1745143487
                                                                }
                                                            } */}
                                                        {client.apartments.length === 0 ? (
                                                            <span className="text-danger fs-12 fst-italic">{t('Not Exist')}</span>
                                                        ) : (
                                                            <>
                                                                <span className="d-block">
                                                                    {client.apartments[0]?.rooms} rooms, {client.apartments[0]?.totalArea} {t('M')}²
                                                                </span>
                                                                <span className="d-block fs-13 text-muted">
                                                                    {client.apartments[0]?.block}/{client.apartments[0]?.floor},{' '}
                                                                    {client.apartments[0]?.floor}
                                                                    {t('Th floor')}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    {client.apartments.length === 0 ? (
                                                        <span>-</span>
                                                    ) : (
                                                        <span>500 000 000 sum / 1 000 000 000 sum</span>
                                                    )}
                                                </td>
                                                <td>{client.apartments.length === 0 ? <span>-</span> : <span>To’langan</span>}</td>
                                                <td>{client.apartments.length === 0 ? <span>-</span> : <span>N-001.pdf</span>}</td>
                                                <td className="text-end">
                                                    <div className="d-flex gap-1 justify-content-center">
                                                        <TooltipElement tooltipText={t('Download Contract')}>
                                                            <Button className="btn-soft-info btn-icon">
                                                                <i className="ri-download-cloud-2-line" style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement>
                                                        {/* <TooltipElement tooltipText={t('Chat')}>
                                                            <Button className="btn-soft-warning btn-icon">
                                                                <i
                                                                    className="mdi mdi-chat-processing-outline"
                                                                    style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement> */}
                                                        <TooltipElement tooltipText={t('View Client')}>
                                                            <Button className="btn-soft-secondary btn-icon" onClick={() => viewClient(client.id)}>
                                                                <i className="mdi mdi-eye" style={{ transform: 'scale(1.3)' }}></i>
                                                            </Button>
                                                        </TooltipElement>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>
                                                <div className="py-5 text-center">
                                                    <EmptyData />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <Paginations
                            page={pagination.page}
                            totalItems={pagination.total}
                            itemsPerPage={filter.pageSize}
                            perPageChange={(val) => setFilter((prev) => ({ ...prev, pageSize: val }))}
                            currentPage={(val) => setFilter((prev) => ({ ...prev, page: val }))}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default AllClients;
