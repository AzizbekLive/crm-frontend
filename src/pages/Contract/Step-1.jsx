import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Spinner } from 'reactstrap';
import FormInput from '../../Components/Form/FormInput';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import FormPhoneInput from '../../Components/Form/FormPhoneInput';

const Step1 = ({ form, handleGetFormData }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            firstName: form.firstName,
            lastName: form.lastName,
            passportSeries: form.passportSeries,
            phoneNumber1: form.phoneNumber1,
            phoneNumber2: form.phoneNumber2,
            address: form.address,
            currentAddress: form.currentAddress,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(t('This field is required')),
            lastName: Yup.string().required(t('This field is required')),
            passportSeries: Yup.string().required(t('This field is required')),
            phoneNumber1: Yup.string().required(t('This field is required')),
            phoneNumber2: Yup.string().required(t('This field is required')),
            address: Yup.string().required(t('This field is required')),
            currentAddress: Yup.string().required(t('This field is required')),
        }),
        onSubmit: (values) => {
            console.log('values', values);

            handleGetFormData(values, 2);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        },
    });
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}>
            <Row className="gy-3">
                <Col sm={6}>
                    <FormInput name="firstName" label={t('First Name')} type="text" validation={validation} />
                </Col>
                <Col sm={6}>
                    <FormInput name="lastName" label={t('Last Name')} type="text" validation={validation} />
                </Col>
                <Col sm={12}>
                    <FormInput name="passportSeries" label={t('Passport Series')} type="text" validation={validation} />
                </Col>
                <Col sm={6}>
                    <FormPhoneInput name="phoneNumber1" label={t('Phone') + ' 1'} type="text" validation={validation} />
                </Col>
                <Col sm={6}>
                    <FormPhoneInput name="phoneNumber2" label={t('Phone') + ' 2'} type="text" validation={validation} />
                </Col>
                <Col sm={12}>
                    <FormInput name="address" label={t('Address')} type="text" validation={validation} />
                </Col>
                <Col sm={12}>
                    <FormInput name="currentAddress" label={t('Current Address')} type="text" validation={validation} />
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
    );
};

export default Step1;
