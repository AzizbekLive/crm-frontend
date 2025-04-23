import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Progress, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getService, postService } from '../../service';
import { APARTMENTS_ENDPOINT, CLIENTS_ENDPOINT } from '../../helpers/url_helper';
import { toast } from 'sonner';
import Loader from '../../Components/Common/Loader';
import Step1 from './Step-1';
import Step2 from './Step-2';
import Step3 from './Step-3';

import './style.css';
import { formatDate } from '@fullcalendar/core/index.js';

const steps = [
    {
        value: 1,
        position: 0,
        component: Step1,
    },
    {
        value: 2,
        position: 50,
        component: Step2,
    },
    {
        value: 3,
        position: 100,
        component: Step3,
    },
];

const index = () => {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [contract, setContract] = useState(null);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        passportSeries: '',
        phoneNumber1: '',
        phoneNumber2: '',
        address: '',
        currentAddress: '',
        initialPayment: '',
        monthsDuration: '',
        discount: '',
        paymentStartDate: formatDate(new Date(), {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            locale: 'uz',
            hour12: false,
        }),
    });

    const [activeStep, setActiveStep] = useState(1);

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

    const handleGetFormData = async (data, nextStep) => {
        setForm((prev) => ({ ...prev, ...data }));
        setActiveStep(nextStep);
        if (nextStep === 3) {
            try {
                const res = await postService(CLIENTS_ENDPOINT, { ...form, ...data, apartmentId: Number(apartmentId) });
                if (res) {
                    setContract(res);
                    toast.success(t('Contract Created'));
                    setActiveStep(3);
                }
            } catch (error) {}
        }
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
                                            {/* 1 */}
                                            {/* <div className="progress-container">
                                                <div className="progress" id="progress" style={{ width: '50%' }}></div>
                                                <div className="circle active">1</div>
                                                <div className="circle active">2</div>
                                                <div className="circle">3</div>
                                            </div> */}

                                            {/* 2 */}
                                            {/* <div className="serviceStepsListBox">
                                                <ul id="serviceSteps" className="serviceStepsList">
                                                    <li className="active">
                                                        <span className="serviceStepId">Step 1</span>{' '}
                                                        <span className="serviceStepDescription">1 Lorem, ipsum.</span>{' '}
                                                    </li>
                                                    <li className="">
                                                        <span className="serviceStepId">Step 2</span>
                                                        <span className="serviceStepDescription">2 Lorem, ipsum.</span>
                                                    </li>
                                                    <li className="">
                                                        <span className="serviceStepId">Step 3</span>
                                                        <span className="serviceStepDescription">3 Lorem, ipsum.</span>
                                                    </li>
                                                </ul>
                                            </div> */}

                                            {/* 3 */}

                                            <div className="position-relative m-4 mb-5 pb-3">
                                                <Progress value={(activeStep - 1) * 50} style={{ height: '1px' }} color="danger" />
                                                {steps.map((step) => (
                                                    <Button
                                                        size="sm"
                                                        color={activeStep >= step.value ? 'danger' : 'light'}
                                                        onClick={() => setActiveStep(step.value)}
                                                        className={`position-absolute top-0 start-${step.position} translate-middle rounded-pill avatar-xs `}>
                                                        {step.value}
                                                    </Button>
                                                ))}
                                            </div>
                                            {(() => {
                                                const currentStep = steps.find((step) => step.value === activeStep);
                                                return (
                                                    <currentStep.component
                                                        apartment={apartment}
                                                        form={form}
                                                        handleGetFormData={handleGetFormData}
                                                        contract={contract}
                                                    />
                                                );
                                            })()}
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
