import React from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FileIcon } from '../../assets/icons';
import ContractPDF from './ContractPDF';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
const Step3 = ({ contract }) => {
    const { t } = useTranslation();

    const handlePrint = async (contract) => {
        const blob = await pdf(<ContractPDF contract={contract} />).toBlob();
        const blobUrl = URL.createObjectURL(blob);

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Print Contract</title>
                        <style>
                            html, body { margin: 0; padding: 0; height: 100%; }
                            iframe { width: 100%; height: 100%; border: none; }
                        </style>
                    </head>
                    <body>
                        <iframe id="printFrame" src="${blobUrl}"></iframe>
                        <script>
                            const iframe = document.getElementById('printFrame');
                            iframe.onload = function() {
                                setTimeout(() => {
                                    iframe.contentWindow.focus();
                                    iframe.contentWindow.print();
                                }, 500); // slight delay to ensure PDF is fully loaded
                            };
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

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
                        {JSON.stringify(contract)}
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12}>
                <div className="d-flex justify-content-end gap-2">
                    <Button color="primary" onClick={handlePrint}>
                        <i className="ri-printer-line align-bottom me-1"></i> {t('Print Contract')}
                    </Button>
                    <PDFDownloadLink document={<ContractPDF />} fileName="121v3a4566ba3435dw21sauy3.pdf">
                        {({ blob, url, loading, error }) => (
                            <Button type="submit" color="success">
                                {loading ? (
                                    <i className="ri-loader-2-line align-bottom me-1"></i>
                                ) : (
                                    <i className="ri-download-2-fill align-bottom me-1"></i>
                                )}
                                {t('Download PDF')}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </Col>
        </Row>
    );
};

export default Step3;
