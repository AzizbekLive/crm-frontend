import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Label, Nav, NavItem, NavLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FormSelect from '../../Components/Form/FormSelect';
import { useTranslation } from 'react-i18next';
import { apartmentTabs, roles } from '../../util/const';
import { APARTMENTS_ENDPOINT } from '../../helpers/url_helper';
import Paginations from '../../Components/DataTable/Pagination';
import { deleteService, getService } from '../../service/index';
import Loader from '../../Components/Common/Loader';
import EmptyData from '../../Components/Common/EmptyData';
import { formatUZS } from '../../helpers/methods';
import TooltipElement from '../../Components/Common/Tooltip';
import { useProfileStore } from '../../stores/profile';
import DeleteModal from '../../Components/Common/DeleteModal';
import { toast } from 'sonner';

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

const _totalAreaOptions = [
    {
        id: 80,
        name: 80,
    },
    {
        id: 90,
        name: 90,
    },
    {
        id: 100,
        name: 100,
    },
];

const initialFilters = {
    area: '',
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
    const profile = useProfileStore((state) => state.profile);

    const [activeTab, setActiveTab] = useState(window.location.hash || '#apartments');

    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const toggleDeleteModal = () => setDeleteModal((p) => !p);

    const [terraceOptions, setTerraceOptions] = useState(_terraceOptions);
    const [roomOptions, setRoomOptions] = useState(_roomOptions);
    const [floorOptions, setFloorOptions] = useState(_floorOptions);
    const [blockOptions, setBlockOptions] = useState(_blockOptions);
    const [totalAreaOptions, setTotalAreaOptions] = useState(_totalAreaOptions);

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

    const startDeleting = (item) => {
        setSelectedItem(item);
        toggleDeleteModal();
    };

    const deleteApartment = async () => {
        setIsDeleting(true);
        try {
            await deleteService(`${APARTMENTS_ENDPOINT}/${selectedItem.id}`);
            toggleDeleteModal();
            fetchData();
        } catch (error) {
            toast.error(error?.message || t('Error Occured'), {
                duration: 5000,
            });
        } finally {
            setIsDeleting(false);
            setSelectedItem(null);
        }
    };

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
                            {activeTab == '#parking' && (
                                <Col lg={2} md={4} sm={6}>
                                    <FormSelect
                                        options={totalAreaOptions}
                                        label={t('Total Area')}
                                        name="area"
                                        onChange={onChangeFilter}
                                        value={filter.area}
                                    />
                                </Col>
                            )}
                            {activeTab == '#apartments' && (
                                <Col lg={2} md={4} sm={6}>
                                    <FormSelect
                                        options={terraceOptions}
                                        label={t('Terrace')}
                                        name="terrace"
                                        onChange={onChangeFilter}
                                        value={filter.terrace}
                                    />
                                </Col>
                            )}
                            {activeTab == '#apartments' && (
                                <Col lg={2} md={4} sm={6}>
                                    <FormSelect options={roomOptions} label={t('Room')} name="rooms" onChange={onChangeFilter} value={filter.rooms} />
                                </Col>
                            )}
                            {['#apartments', '#stores'].includes(activeTab) && (
                                <Col lg={2} md={4} sm={6}>
                                    <FormSelect
                                        options={floorOptions}
                                        label={t('Floor')}
                                        name="floor"
                                        onChange={onChangeFilter}
                                        value={filter.floor}
                                    />
                                </Col>
                            )}

                            <Col lg={2} md={4} sm={6}>
                                <FormSelect options={blockOptions} label={t('Block')} name="block" onChange={onChangeFilter} value={filter.block} />
                            </Col>
                            <Col lg={2} md={4} sm={6} className="ms-auto align-self-end d-flex justify-content-end gap-2">
                                <Button type="button" color="info" outline onClick={() => setFilter(initialFilters)}>
                                    <i className="bx bx-refresh me-1 align-middle fs-5" />
                                    {t('Clear')}
                                </Button>
                                {/* <Button type="button" color="success">
                                    <i className="ri-add-fill me-1 align-bottom" />
                                    {t('Create')}
                                </Button> */}
                            </Col>
                        </Row>
                    </CardHeader>
                    <Table className="align-middle" hover>
                        <thead className="table-light">
                            <tr>
                                {activeTab === '#apartments' && <th>{t('Rooms')}</th>}
                                {['#apartments', '#parking'].includes(activeTab) && <th>{t('Total Area')}</th>}
                                {['#apartments', '#stores'].includes(activeTab) && <th>{t('Floor')}</th>}
                                <th>{t('Block')}</th>
                                {activeTab === '#apartments' && (
                                    <th>
                                        {t('Price For Per')} {t('M')}
                                        <sup>2</sup>
                                    </th>
                                )}
                                {activeTab === '#apartments' && <th>{t('Total Price')}</th>}
                                {activeTab === '#apartments' && <th>{t('Status')}</th>}
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
                                        {activeTab === '#apartments' && (
                                            <td>
                                                {apartment.rooms} {t('Rooms')}
                                            </td>
                                        )}
                                        {['#apartments', '#parking'].includes(activeTab) && (
                                            <td>
                                                {apartment.totalArea} {t('M')}
                                                <sup>2</sup>
                                            </td>
                                        )}
                                        {['#apartments', '#stores'].includes(activeTab) && (
                                            <td>
                                                {apartment.floor}
                                                {t('Th floor')}{' '}
                                            </td>
                                        )}
                                        <td>{apartment.block}</td>
                                        {activeTab === '#apartments' && <td>{formatUZS(apartment.totalPricePerMeter)}</td>}
                                        {activeTab === '#apartments' && <td>{formatUZS(apartment.totalPrice)}</td>}
                                        {activeTab === '#apartments' && (
                                            <td>
                                                {apartment.isAvailable ? (
                                                    <Badge color="success">{t('Available')}</Badge>
                                                ) : (
                                                    <Badge color="danger">{t('Owned')}</Badge>
                                                )}
                                            </td>
                                        )}
                                        <td className="d-flex justify-content-end gap-2">
                                            <TooltipElement tooltipText={t('View')}>
                                                <Button
                                                    className="btn-soft-secondary btn-icon btn-sm"
                                                    onClick={() => navigate(`/apartments/${apartment.id}`)}>
                                                    <i className="mdi mdi-eye" style={{ transform: 'scale(1.3)' }}></i>
                                                </Button>
                                            </TooltipElement>
                                            {profile.role === roles.SUPERADMIN && (
                                                <TooltipElement tooltipText={t('Delete')}>
                                                    <Button className="btn-soft-danger btn-icon btn-sm" onClick={() => startDeleting(apartment)}>
                                                        <i className="ri-delete-bin-6-line" style={{ transform: 'scale(1.3)' }}></i>
                                                    </Button>
                                                </TooltipElement>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                    {/* Pagination */}
                    <Paginations
                        page={pagination.page}
                        totalItems={pagination.total}
                        itemsPerPage={filter.pageSize}
                        perPageChange={(val) => onChangeFilter('pageSize', val)}
                        currentPage={(val) => onChangeFilter('page', val)}
                    />

                    {/* Delete modal */}
                    <DeleteModal
                        show={deleteModal}
                        onDeleteClick={deleteApartment}
                        onCloseClick={toggleDeleteModal}
                        title={<h4>{t('Delete Apartment')}</h4>}
                        text={t('Are you sure you want to delete this apartment?')}
                        loading={isDeleting}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Apartments;
