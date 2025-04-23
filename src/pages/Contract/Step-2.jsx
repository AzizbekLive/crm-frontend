import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormFeedback,
    Input,
    Label,
    Row,
    Spinner,
    UncontrolledDropdown,
} from 'reactstrap';
import { BlockIcon, FloorIcon, RoomsIcon, TotalAreaIcon, TotalPriceIcon, TypeOfApartmentIcon } from '../../assets/icons';
import { formatUZS } from '../../helpers/methods';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormInput from '../../Components/Form/FormInput';
// import FormMoneyInput from '../../Components/Form/FormMoneyInput';
import FormDatePicker from '../../Components/Form/FormDatePicker';
import Cleave from 'cleave.js/react';
// import { formatDate } from '@fullcalendar/core';

const Step2 = ({ form, apartment, handleGetFormData }) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            initialPayment: form.initialPayment,
            monthsDuration: form.monthsDuration,
            discount: form.discount,
            paymentStartDate: form.paymentStartDate,
        },
        validationSchema: Yup.object({
            initialPayment: Yup.string().required(t('This field is required')),
            monthsDuration: Yup.number(t('This field should be number')).required(t('This field is required')),
            discount: Yup.number().max(100, t('Should be less than 100')),
        }),
        onSubmit: async (values) => {
            values.initialPayment = Number(values.initialPayment.replace(/,/g, ''));
            setLoading(true);
            handleGetFormData(values, 3);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        },
    });

    return (
        <Row>
            <Col sm={12}>
                <Card className="shadow-none border rounded-3">
                    <CardBody>
                        <Row className="gy-3">
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="circle-icon-sm bg-soft-danger">
                                        <TypeOfApartmentIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Type Of Housing')}</span>
                                        <h4 className="mb-0">{apartment.typeOfHousing}</h4>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="circle-icon-sm bg-soft-danger">
                                        <RoomsIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Rooms')}</span>
                                        <h4 className="mb-0">{apartment.rooms}</h4>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="circle-icon-sm bg-soft-danger">
                                        <TotalAreaIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Total Area')}</span>
                                        <h4 className="mb-0">
                                            {apartment.totalArea} {t('M')}²
                                        </h4>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="avatar-sm circle-icon-sm bg-soft-danger">
                                        <FloorIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Floor')}</span>
                                        <h4 className="mb-0">{apartment.floor}</h4>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="circle-icon-sm bg-soft-danger">
                                        <BlockIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Block')}</span>
                                        <h4 className="mb-0">{apartment.block}</h4>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="circle-icon-sm bg-soft-danger">
                                        <TotalPriceIcon />
                                    </div>
                                    <div>
                                        <span className="text-muted">{t('Total Price')}</span>
                                        <h4 className="mb-0">{formatUZS(apartment.totalPrice)}</h4>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12}>
                <Form
                    onSubmit={(evt) => {
                        evt.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}>
                    <Row className="gy-3">
                        <Col sm={6}>
                            <Label>{t('Initial Payment')}</Label>
                            <div className="input-group flex-shrink-0">
                                <Cleave
                                    options={{
                                        numeral: true,
                                        numeralThousandsGroupStyle: 'thousand',
                                    }}
                                    name="initialPayment"
                                    onChange={validation.handleChange}
                                    value={validation.values.initialPayment || ''}
                                    className={`form-control ${
                                        validation.touched.initialPayment && validation.errors.initialPayment && 'is-invalid'
                                    } `}
                                    onBlur={validation.handleBlur}
                                />
                                <span className="input-group-text bg-transparent">UZS</span>
                            </div>
                            {validation.touched.initialPayment && validation.errors.initialPayment ? (
                                <FormFeedback className="d-block" type="invalid">
                                    {validation.errors.initialPayment}
                                </FormFeedback>
                            ) : null}
                        </Col>
                        <Col sm={6}>
                            <FormInput name="monthsDuration" label={t('How Many Months')} type="number" validation={validation} />
                        </Col>
                        <Col sm={6}>
                            <Label>{t('Discount')}</Label>
                            <div className="input-group flex-shrink-0">
                                <FormInput name="discount" type="number" validation={validation} noFeedBack />
                                <span className="input-group-text bg-transparent">%</span>
                            </div>
                            {validation.touched.discount && validation.errors.discount ? (
                                <FormFeedback className="d-block" type="invalid">
                                    {validation.errors.discount}
                                </FormFeedback>
                            ) : null}
                            {validation.values.discount && (
                                <ul>
                                    <li>
                                        {t('Discount')}:{' '}
                                        <span className="text-muted text-sm">
                                            -{formatUZS((apartment.totalPrice * validation.values.discount) / 100, true)}
                                        </span>
                                    </li>
                                    <li>
                                        {t('Remained Price')}:{' '}
                                        <span className="text-muted text-sm">
                                            {formatUZS(apartment.totalPrice - (apartment.totalPrice * validation.values.discount) / 100, true)}
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </Col>
                        <Col sm={6}>
                            <FormDatePicker name="paymentStartDate" label={t('Start Date')} validation={validation} enableTime={false} />
                        </Col>
                        <Col sm={12}>
                            <div className="d-flex justify-content-end gap-2">
                                <Button color="light">{t('Cancel')}</Button>
                                <Button type="submit" color="success" disabled={loading} className="d-flex align-items-center gap-1">
                                    {loading && <Spinner size={'sm'} />}
                                    {t('Continue')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default Step2;
