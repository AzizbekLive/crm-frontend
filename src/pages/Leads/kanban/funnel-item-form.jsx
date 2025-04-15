import React from 'react';
import { Button, Card, CardBody, Input, Label } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { useTranslation } from 'react-i18next';

const FunnelItemForm = ({ closeForm }) => {
    const { t } = useTranslation();
    const onSubmit = (evt) => {
        evt.preventDefault();
    };

    return (
        <Card className="mb-0">
            <CardBody>
                <form action="" onSubmit={onSubmit}>
                    <SimpleBar style={{ height: '431px' }} className="px-3 mx-n3 mb-2">
                        <div className="d-flex flex-column gap-3 pb-3">
                            <div>
                                <Label className="form-label">{t('Full Name')}</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                            <div>
                                <Label className="form-label">{t('Phone')} 1</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                            <div>
                                <Label className="form-label"> {t('Phone')} 2</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                            <div>
                                <Label className="form-label"> {t('Address')}</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                            <div>
                                <Label className="form-label">
                                    {t('Note')} <span className="text-muted">({t('Optional')})</span>
                                </Label>
                                <textarea type="text" className="form-control resize-none" name="name" rows={4}></textarea>
                            </div>
                            <div>
                                <Label className="form-label">{t('Employee')}</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                        </div>
                    </SimpleBar>
                    <div className="border-top mb-3"></div>
                    <div className="d-flex justify-content-end gap-2">
                        <Button size="sm" type="button" color="primary" outline className="btn-soft-primary" onClick={closeForm}>
                            {t('Cancel')}
                        </Button>
                        <Button size="sm" type="submit" color="success" outline className="btn-soft-success">
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default FunnelItemForm;
