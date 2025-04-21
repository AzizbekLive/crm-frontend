import React from 'react';
import { Col, Row } from 'reactstrap';
import Loader from '../../../Components/Common/Loader';
import { useTranslation } from 'react-i18next';

const Details = ({ client }) => {
    const { t } = useTranslation();
    if (!client) return <Loader />;

    return (
        <Row className="gy-4">
            <Col md={2}>
                <p className="text-muted mb-1">{t('Full Name')}</p>
                <h5>{`${client?.firstName} ${client?.lastName}`}</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">{t('Phone')} 1</p>
                <h5>{client.phoneNumber1}</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">{t('Phone')} 2</p>
                <h5>{client.phoneNumber2}</h5>
            </Col>

            <Col md={6}></Col>
            <Col md={2}>
                <p className="text-muted mb-1">{t('Contract')}</p>
                <h5>N-001.pdf</h5>
            </Col>
            <Col md={2}>
                <p className="text-muted mb-1">{t('Address')}</p>
                <h5>{client.address}</h5>
            </Col>
        </Row>
    );
};

export default Details;
