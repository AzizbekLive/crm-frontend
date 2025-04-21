import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Label, Nav, NavItem, NavLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FormSelect from '../../Components/Form/FormSelect';
import { useTranslation } from 'react-i18next';
import { apartmentTabs } from '../../util/const';
import { APARTMENTS_ENDPOINT } from '../../helpers/url_helper';
import Paginations from '../../Components/DataTable/Pagination';
import { getService } from '../../service/index';
import Loader from '../../Components/Common/Loader';
import EmptyData from '../../Components/Common/EmptyData';
import { formatUZS } from '../../helpers/methods';
import TooltipElement from '../../Components/Common/Tooltip';

const _terraceOptions = [
    {
        id: true,
        name: 'Exist',
    },
    {
        id: false,
        name: 'Not Exist',
    },
];
const _roomOptions = [
    {
        id: 1,
        name: '1x Room',
    },
    {
        id: 2,
        name: '2x Rooms',
    },
    {
        id: 3,
        name: '3x Rooms',
    },
];
const _floorOptions = [
    {
        id: 1,
        name: 'Floor 1',
    },
    {
        id: 2,
        name: 'Floor 2',
    },
    {
        id: 3,
        name: 'Floor 3',
    },
    {
        id: 4,
        name: 'Floor 4',
    },
    {
        id: 5,
        name: 'Floor 5',
    },
];
const _blockOptions = [
    {
        id: 1,
        name: 'Block 1',
    },
    {
        id: 2,
        name: 'Block 2',
    },
    {
        id: 3,
        name: 'Block 3',
    },
    {
        id: 4,
        name: 'Block 4',
    },
    {
        id: 5,
        name: 'Block 5',
    },
    {
        id: 6,
        name: 'Block 6',
    },
];

const initialFilters = {
    rooms: '',
    floor: '',
    block: '',
    terrace: '',
    page: 1,
    pageSize: 10,
};

const Apartments = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState(window.location.hash || '#apartments');

    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [terraceOptions, setTerraceOptions] = useState(_terraceOptions);
    const [roomOptions, setRoomOptions] = useState(_roomOptions);
    const [floorOptions, setFloorOptions] = useState(_floorOptions);
    const [blockOptions, setBlockOptions] = useState(_blockOptions);

    const [filter, setFilter] = useState({ ...initialFilters });
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

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            navigate(`${tab}`, { replace: true });
        }
    };

    const fetchData = useCallback(
        async (params = {}) => {
            setLoading(true);
            try {
                const res = await getService(APARTMENTS_ENDPOINT, { ...filter, ...params });
                if (res) {
                    const { items, ...paginationProps } = res;
                    setApartments(items);
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
        fetchData();
    }, [fetchData]);

    return (
        <Row>
            <Col xs={12}>
                <Card>
                    <CardHeader>
                        <h5 className="mb-0">{t('Apartments')}</h5>
                    </CardHeader>
                    <CardHeader>
                        <div className="row align-items-center border-0">
                            <div className="col">
                                <Nav className="nav-tabs-custom card-header-tabs border-bottom-0" role="tablist">
                                    {apartmentTabs.map((tab) => (
                                        <NavItem key={tab.hash}>
                                            <NavLink
                                                className={classnames({ active: activeTab === tab.hash }, 'fw-semibold')}
                                                onClick={() => toggleTab(tab.hash)}
                                                href="#">
                                                {t(tab.label)}
                                            </NavLink>
                                        </NavItem>
                                    ))}
                                </Nav>
                            </div>
                        </div>
                    </CardHeader>
                    <CardHeader className="border-0">
                        <Row>
                            <Col lg={2} md={4} sm={6}>
                                <FormSelect
                                    options={terraceOptions}
                                    label={t('Terrace')}
                                    name="terrace"
                                    onChange={onChangeFilter}
                                    value={filter.terrace}
                                />
                            </Col>
                            <Col lg={2} md={4} sm={6}>
                                <FormSelect options={roomOptions} label={t('Room')} name="rooms" onChange={onChangeFilter} value={filter.rooms} />
                            </Col>
                            <Col lg={2} md={4} sm={6}>
                                <FormSelect options={floorOptions} label={t('Floor')} name="floor" onChange={onChangeFilter} value={filter.floor} />
                            </Col>
                            <Col lg={2} md={4} sm={6}>
                                <FormSelect options={blockOptions} label={t('Block')} name="block" onChange={onChangeFilter} value={filter.block} />
                            </Col>
                            <Col lg={2} md={4} sm={6} className="ms-auto align-self-end d-flex justify-content-end">
                                <Button type="button" color="info" outline className="ms-auto" onClick={() => setFilter(initialFilters)}>
                                    <i className="bx bx-refresh me-1 align-middle fs-5" />
                                    {t('Clear')}
                                </Button>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Table className="align-middle" hover>
                        <thead className="table-light">
                            <tr>
                                <th>{t('Rooms')}</th>
                                <th>{t('Total Area')}</th>
                                <th>{t('Floor')}</th>
                                <th>{t('Block')}</th>
                                <th>
                                    {t('Price For Per')} m<sup>2</sup>
                                </th>
                                <th>{t('Total Price')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <th colSpan={7}>
                                        <Loader />
                                    </th>
                                </tr>
                            ) : apartments.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        <EmptyData title={t('No Data')} text=" " />
                                    </td>
                                </tr>
                            ) : (
                                apartments.map((apartment) => (
                                    <tr key={apartment.id}>
                                        <td>
                                            {apartment.rooms} {t('Rooms')}
                                        </td>
                                        <td>
                                            {apartment.totalArea} {t('M')}
                                            <sup>2</sup>
                                        </td>
                                        <td>
                                            {apartment.floor}
                                            {t('Th floor')}{' '}
                                        </td>
                                        <td>{apartment.block}</td>
                                        <td>{formatUZS(apartment.totalPricePerMeter)}</td>
                                        <td>{formatUZS(apartment.totalPrice)}</td>
                                        <td>
                                            <TooltipElement tooltipText={t('View')}>
                                                <Button
                                                    className="btn-soft-secondary btn-icon"
                                                    onClick={() => navigate(`/apartments/${apartment.id}`)}>
                                                    <i className="mdi mdi-eye" style={{ transform: 'scale(1.3)' }}></i>
                                                </Button>
                                            </TooltipElement>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    <Paginations
                        page={pagination.page}
                        totalItems={pagination.total}
                        itemsPerPage={filter.pageSize}
                        perPageChange={(val) => onChangeFilter('pageSize', val)}
                        currentPage={(val) => onChangeFilter('page', val)}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Apartments;
