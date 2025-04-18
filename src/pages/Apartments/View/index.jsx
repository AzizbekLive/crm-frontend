import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getService } from '../../../service';
import { APARTMENTS_ENDPOINT } from '../../../helpers/url_helper';
import Loader from '../../../Components/Common/Loader';
import EmptyData from '../../../Components/Common/EmptyData';
import { BlockIcon, FloorIcon, RoomsIcon, TotalAreaIcon, TotalPriceIcon, TypeOfApartmentIcon } from '../../../assets/icons';
import { formatUZS } from '../../../helpers/methods';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLayoutStore } from '../../../stores/layouts';
import '../style.css';
const ApartmentDetails = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const layoutModeType = useLayoutStore((s) => s.layoutModeType);
    const { id } = useParams();

    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchApartment() {
        setLoading(true);
        try {
            const apartmentData = await getService(`${APARTMENTS_ENDPOINT}/${id}`);
            console.log({ apartmentData });
            setApartment(apartmentData);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchApartment();
        return () => setApartment(null);
    }, []);

    const images = [
        'https://sfyimby.com/wp-content/uploads/2020/10/The-Asher-rendering-via-Carmel-Partners-777x457.jpg',
        'https://www.keyhousing.com/wp-content/uploads/The-Asher-1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOVjB3ucvbvRIWXJAQgcUmuE2rFGnsz_9Kxk8Wplo9WBXEQlwFtZrbBmY64q-NmAvR1s&usqp=CAU',
    ];

    const settings = {
        customPaging: function (i, k, j) {
            console.log({ i, k, j });
            if (!apartment) return '';

            return (
                <a className="mx-2 block">
                    <img src={images[i]} width={50} />
                    {/* <img src={`${process.env.REACT_APP_API_URL}${apartment.images[i]}`} /> */}
                </a>
            );
        },
        dots: true,
        dotsClass: 'slick-custom-images',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: (
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.5 11L6.5 6L1.5 1"
                    stroke={layoutModeType === 'dark' ? 'gray' : '#344054'}
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        prevArrow: (
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.5 11L1.5 6L6.5 1"
                    stroke={layoutModeType === 'dark' ? 'gray' : '#344054'}
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    };

    return (
        <Row>
            <Col sm={12} className="mb-3">
                <Button color="dark" outline className="btn btn-ghost-dark" onClick={() => navigate('/apartments')}>
                    <i className="ri-arrow-left-line align-middle me-1"></i> {t('Back')}
                </Button>
            </Col>
            <Col sm={12}>
                {loading ? (
                    <Loader />
                ) : !apartment ? (
                    <EmptyData title={t('No Data')} text=" " />
                ) : (
                    <React.Fragment>
                        <Card>
                            <CardHeader>
                                <div className="d-flex align-items-center w-100 justify-content-between">
                                    <h3 className="flex-flow-1 mb-0">
                                        {apartment.rooms} {t('Rooms')}, {t(apartment.typeOfHousing)}, {apartment.totalArea} {t('M')}²,{' '}
                                        {apartment.block}/{apartment.floor} {t('Floor')}
                                    </h3>
                                    <Button color="success" onClick={() => navigate(`/contract/${id}`)}>
                                        {t('Contract')}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm={4}>
                                        <div className="border p-3 rounded-3">
                                            <h5 className="mb-4 mt-2">{t('Description Of Apartment')}</h5>
                                            <div className="d-flex flex-column gap-5">
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <TypeOfApartmentIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Type Of Housing')}</span>
                                                        <h4 className="mb-0">{apartment.typeOfHousing}</h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <RoomsIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Rooms')}</span>
                                                        <h4 className="mb-0">{apartment.rooms}</h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <TotalAreaIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Total Area')}</span>
                                                        <h4 className="mb-0">
                                                            {apartment.totalArea} {t('M')}²
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <FloorIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Floor')}</span>
                                                        <h4 className="mb-0">{apartment.floor}</h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <BlockIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Block')}</span>
                                                        <h4 className="mb-0">{apartment.block}</h4>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-3 align-items-center">
                                                    <div
                                                        style={{ width: '60px', height: '60px' }}
                                                        className="rounded-circle bg-soft-danger d-flex align-items-center justify-content-center">
                                                        <TotalPriceIcon />
                                                    </div>
                                                    <div>
                                                        <span className="text-muted fs-18">{t('Total Price')}</span>
                                                        <h4 className="mb-0">{formatUZS(apartment.totalPrice)}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={8}>
                                        <div className="border p-3 rounded-3 h-100">
                                            <div className="slider-container h-100">
                                                <Slider {...settings}>
                                                    {images.map((image) => (
                                                        <div key={image}>
                                                            <img
                                                                src={image}
                                                                alt="dsdsd"
                                                                className={'mx-auto my-3'}
                                                                style={{ height: '500px', width: '800px', objectFit: 'content' }}
                                                            />
                                                        </div>
                                                    ))}
                                                    {/* {apartment.images.map((image) => (
                                                        <div key={image}>
                                                            <img src={process.env.REACT_APP_API_URL + image} />
                                                        </div>
                                                    ))} */}
                                                </Slider>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </React.Fragment>
                )}
            </Col>
        </Row>
    );
};

export default ApartmentDetails;
