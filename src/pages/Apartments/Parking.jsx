import React from 'react';

const Parking = () => {
    return (
        <>
            <CardHeader className="border-0">
                <Row>
                    <Col lg={2} md={4} sm={6}>
                        <FormSelect options={terraceOptions} label={t('Terrace')} name="terrace" onChange={onChangeFilter} value={filter.terrace} />
                    </Col>
                    <Col lg={2} md={4} sm={6}>
                        <FormSelect options={blockOptions} label={t('Block')} name="block" onChange={onChangeFilter} value={filter.block} />
                    </Col>
                    <Col lg={2} md={4} sm={6} className="ms-auto align-self-end d-flex justify-content-end">
                        <Button type="button" color="info" outline className="ms-auto" onClick={() => setFilter(initialFilters)}>
                            <i className="bx bx-refresh me-1 align-middle fs-5" />
                            {t('Clear')}
                        </Button>
                    </Col>
                </Row>
            </CardHeader>
            <Table className="align-middle" hover>
                <thead className="table-light">
                    <tr>
                        <th>{t('Rooms')}</th>
                        <th>{t('Total Area')}</th>
                        <th>{t('Floor')}</th>
                        <th>{t('Block')}</th>
                        <th>
                            {t('Price For Per')} m<sup>2</sup>
                        </th>
                        <th>{t('Total Price')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <th colSpan={7}>
                                <Loader />
                            </th>
                        </tr>
                    ) : apartments.length === 0 ? (
                        <tr>
                            <td colSpan={7}>
                                <EmptyData title={t('No Data')} text=" " />
                            </td>
                        </tr>
                    ) : (
                        apartments.map((apartment) => (
                            <tr key={apartment.id}>
                                <td>
                                    {apartment.rooms} {t('Rooms')}
                                </td>
                                <td>
                                    {apartment.totalArea} {t('M')}
                                    <sup>2</sup>
                                </td>
                                <td>
                                    {apartment.floor}
                                    {t('Th floor')}{' '}
                                </td>
                                <td>{apartment.block}</td>
                                <td>{formatUZS(apartment.totalPricePerMeter)}</td>
                                <td>{formatUZS(apartment.totalPrice)}</td>
                                <td>
                                    <TooltipElement tooltipText={t('View')}>
                                        <Button className="btn-soft-secondary btn-icon" onClick={() => navigate(`/apartments/${apartment.id}`)}>
                                            <i className="mdi mdi-eye" style={{ transform: 'scale(1.3)' }}></i>
                                        </Button>
                                    </TooltipElement>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default Parking;
