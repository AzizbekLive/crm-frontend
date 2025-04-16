import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, Spinner } from 'reactstrap';

const DeleteModal = ({ show, onDeleteClick, onCloseClick, title, text, loading }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true}>
            <div className="position-relative">
                <span
                    className="position-absolute fs-2"
                    style={{ top: '10px', right: '20px', cursor: 'pointer', zIndex: '999' }}
                    onClick={onCloseClick}>
                    &times;
                </span>
            </div>
            <ModalBody className="py-3 px-5">
                <div className="mt-2 text-center">
                    <div className="mt-4 pt-2 fs-15">
                        <div>{title}</div>
                        <p className="text-muted mx-4 mb-0">{text}</p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal" onClick={onCloseClick}>
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn w-sm btn-danger d-flex align-items-center gap-2"
                        id="delete-record"
                        onClick={onDeleteClick}
                        disabled={loading}>
                        {loading && <Spinner size={'sm'} />}
                        Yes, Delete It!
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

DeleteModal.propTypes = {
    onCloseClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    show: PropTypes.any,
};

export default DeleteModal;
