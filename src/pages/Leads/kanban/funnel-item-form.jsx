import React, { useRef, useState } from 'react';
import { Button, Card, CardBody, Input, Label, Spinner } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { useTranslation } from 'react-i18next';
import FormPhoneInput from '../../../Components/Form/FormPhoneInput';
import FormDatePicker from '../../../Components/Form/FormDatePicker';
import { postService } from '../../../service';
import { LEADS_ENDPOINT } from '../../../helpers/url_helper';
import { toast } from 'sonner';

const FunnelItemForm = ({ closeForm, fetchData }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const formElement = useRef(null);

    const onSubmit = async (evt) => {
        evt.preventDefault();

        setLoading(true);
        const fd = new FormData(evt.target);

        const data = Object.fromEntries(fd.entries());
        data.phones = [data.phone1, data.phone2];
        data.addresses = [data.addresses];
        data.kanbanId = -1;
        data.image = 'string';
        data.status = 0;
        delete data.phone1;
        delete data.phone2;

        try {
            const res = await postService(LEADS_ENDPOINT, data);
            if (res?.id) {
                toast.success(t('Successfully Added'));
            }
            if (formElement.current) {
                formElement.current.reset();
            }
            fetchData();
        } catch (error) {
            toast.error(t('Error Occured'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-0">
            <CardBody>
                <form action="" onSubmit={onSubmit} ref={formElement}>
                    <SimpleBar style={{ height: '431px' }} className="px-3 mx-n3 mb-2">
                        <div className="d-flex flex-column gap-3 pb-3">
                            <div>
                                <Label className="form-label">{t('Full Name')}</Label>
                                <Input type="text" className="form-control" name="name"></Input>
                            </div>
                            <div>
                                <Label className="form-label">{t('Phone')} 1</Label>
                                <FormPhoneInput name="phone1" />
                            </div>
                            <div>
                                <Label className="form-label"> {t('Phone')} 2</Label>
                                <FormPhoneInput name="phone2" />
                            </div>
                            <div>
                                <Label className="form-label"> {t('Address')}</Label>
                                <Input type="text" className="form-control" name="addresses"></Input>
                            </div>
                            <div>
                                <Label className="form-label"> {t('Date')}</Label>
                                <FormDatePicker />
                            </div>
                            <div>
                                <Label className="form-label">
                                    {t('Note')} <span className="text-muted">({t('Optional')})</span>
                                </Label>
                                <textarea className="form-control resize-none" name="note" rows={4}></textarea>
                            </div>
                        </div>
                    </SimpleBar>
                    <div className="border-top mb-3"></div>
                    <div className="d-flex justify-content-end gap-2">
                        <Button size="sm" type="button" color="primary" outline className="btn-soft-primary" onClick={closeForm}>
                            {t('Cancel')}
                        </Button>
                        <Button size="sm" type="submit" color="success" outline className="btn-soft-success d-flex gap-1" disabled={loading}>
                            {loading && <Spinner size={'sm'} />}
                            {t('Save')}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default FunnelItemForm;
