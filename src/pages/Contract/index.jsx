import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getService } from '../../service';
import { APARTMENTS_ENDPOINT } from '../../helpers/url_helper';
import { toast } from 'sonner';
import Loader from '../../Components/Common/Loader';
import Step1 from './Step-1';

const index = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [apartment, setApartment] = useState({
        rooms: 0,
        typeOfHousing: '',
        totalArea: 0,
        block: 0,
        floor: 0,
    });
    const [loading, setLoading] = useState(false);

    async function fetchApartment() {
        setLoading(true);
        try {
            const apartmentData = await getService(`${APARTMENTS_ENDPOINT}/${apartmentId}`);
            if (!apartmentData) {
                toast.error(t('Error Occured'));
            }
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
                ) : (
                    <React.Fragment>
                        <Card>
                            <CardHeader>
                                <h3>{t('Contract')}</h3>
                                <p className="text-muted mb-0">
                                    {apartment.rooms} {t('Rooms')}, {t(apartment.typeOfHousing)}, {apartment.totalArea} {t('M')}², {apartment.block}/
                                    {apartment.floor} {t('Floor')}
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col></Col>
                                    <Col xl={6} sm={4}>
                                        <div className="mx-auto">
                                            <Step1 />
                                        </div>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </React.Fragment>
                )}
            </Col>
        </Row>
    );
};

export default index;
