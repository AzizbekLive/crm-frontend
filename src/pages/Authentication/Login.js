import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

import { Link, useNavigate } from 'react-router-dom';
import withRouter from '../../Components/Common/withRouter';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { toast } from 'sonner';
import { postService } from '../../service';
import { AUTH_ENDPOINT } from '../../helpers/url_helper';
import { setAuthorization } from '../../helpers/api_helper';

// actions

// import logoLight from '../../assets/images/logo-light.png';
//Import config

const Login = () => {
    const navigate = useNavigate();

    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            login: 'admin',
            password: '12345',
        },
        validationSchema: Yup.object({
            login: Yup.string().required('Пожалуйста, введите ваше имя пользователя'),
            password: Yup.string().required('Пожалуйста, введите ваш пароль'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            // try {
            // setTimeout(() => {
            //     navigate('/');
            // }, 1000);
            const { token } = await postService(AUTH_ENDPOINT, values);
            try {
                if (token) {
                    console.log({ token });

                    setAuthorization(token);
                    sessionStorage.setItem('authUser', token);
                    navigate('/');
                }
            } catch (error) {
                const errorMessage = 'Error occured';
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Добро пожаловать!</h5>
                                            <p className="text-muted">Войдите в систему</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">
                                                <div className="mb-3">
                                                    <Label htmlFor="login" className="form-label">
                                                        Имя пользователя
                                                    </Label>
                                                    <Input
                                                        name="login"
                                                        className="form-control"
                                                        placeholder="Введите имя пользователя"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.login || ''}
                                                        invalid={validation.touched.login && validation.errors.login ? true : false}
                                                    />
                                                    {validation.touched.login && validation.errors.login ? (
                                                        <FormFeedback type="invalid">{validation.errors.login}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="password-input">
                                                        Пароль
                                                    </Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ''}
                                                            type={passwordShow ? 'text' : 'password'}
                                                            className="form-control pe-5"
                                                            placeholder="Введите пароль"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={validation.touched.password && validation.errors.password ? true : false}
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button"
                                                            id="password-addon"
                                                            onClick={() => setPasswordShow(!passwordShow)}>
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Button
                                                        disabled={loading ? true : false}
                                                        color="success"
                                                        className="btn btn-danger w-100"
                                                        type="submit">
                                                        {loading ? <Spinner size="sm" className="me-2" /> : null}
                                                        Войти
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
