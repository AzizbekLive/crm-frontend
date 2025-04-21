import React from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FileIcon } from '../../assets/icons';
const Step3 = () => {
    const { t } = useTranslation();
    return (
        <Row className="gy-3">
            <Col sm={12}>
                <h5>{t('The Contract Ready')}.</h5>
                <Card className="mt-3 border shadow-none">
                    <CardBody>
                        <div className="d-flex gap-3 align-items-center">
                            <div className="circle-icon-sm bg-soft-danger">
                                <FileIcon />
                            </div>
                            <div>
                                <h5 className="mb-0">N-001.pdf</h5>
                                <span className="text-muted">200 KB</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12}>
                <div className="d-flex justify-content-end gap-2">
                    <Button color="primary" onClick={() => window.print()}>
                        <i className="ri-printer-line align-bottom me-1"></i> {t('Print Contract')}
                    </Button>
                    <Button type="submit" color="success">
                        <i className="ri-download-2-fill align-bottom me-1"></i>
                        {t('Download PDF')}
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default Step3;
