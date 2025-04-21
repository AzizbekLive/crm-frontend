import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'reactstrap';
import FormInput from '../../Components/Form/FormInput';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import FormPhoneInput from '../../Components/Form/FormPhoneInput';

const Step1 = () => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            firstName: '',
            lastName: '',
            passport: '',
            phone1: '',
            phone2: '',
            address1: '',
            address2: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(t('This field is required')),
            lastName: Yup.string().required(t('This field is required')),
            passport: Yup.string().required(t('This field is required')),
            phone1: Yup.string().required(t('This field is required')),
            phone2: Yup.string().required(t('This field is required')),
            address1: Yup.string().required(t('This field is required')),
            address2: Yup.string().required(t('This field is required')),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
            } catch (error) {
            } finally {
                setLoading(false);
            }
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
                    <FormInput name="passport" label={t('Passport Series')} type="text" validation={validation} />
                </Col>
                <Col sm={6}>
                    <FormPhoneInput name="phone1" label={t('Phone') + ' 1'} type="text" validation={validation} />
                </Col>
                <Col sm={6}>
                    <FormPhoneInput name="phone2" label={t('Phone') + ' 2'} type="text" validation={validation} />
                </Col>
                <Col sm={12}>
                    <FormInput name="address1" label={t('Address')} type="text" validation={validation} />
                </Col>
                <Col sm={12}>
                    <div className="d-flex justify-content-end gap-2">
                        <Button color="light">{t('Cancel')}</Button>
                        <Button type="submit" color="success">
                            {t('Continue')}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

export default Step1;
