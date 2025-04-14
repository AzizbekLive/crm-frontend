import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { formatFileSize } from '../../helpers/methods';

const FormInputFile = forwardRef(({ images, multiple = false, postImage, deleteImage, ...props }, ref) => {
    const inputRef = useRef(null);
    const [uploadedImages, setUploadedImages] = useState([...images]);
    function handleInput() {
        inputRef.current.click();
    }

    function onChange(evt) {
        evt.preventDefault();
        const file = evt.target.files[0];
        postImage(file);
    }

    const getImageUrl = (url) => process.env.REACT_APP_URL + url;

    useEffect(() => {
        setUploadedImages(() =>
            images.map((image) => ({
                ...image,
                url: getImageUrl(image?.image),
                name: image?.image.split('/').pop(),
                size: '123.8 KB',
            }))
        );
    }, [images]);

    return (
        <React.Fragment>
            <Label htmlFor="file-input" className="form-label">
                {props.label}
            </Label>
            <Input innerRef={inputRef} id="file-input" ref={ref} type="file" multiple={multiple} onChange={onChange} {...props} className="d-none" />
            <div className="rounded-2 py-5 my-2 border border-secondary border-dashed text-center">
                <Button type="button" onClick={handleInput}>
                    <i className="ri-upload-cloud-2-line align-middle"></i> Upload
                </Button>
            </div>

            {/* Images */}
            <Row className="gy-3">
                {uploadedImages?.map((image) => (
                    <Col md={4} key={image.url}>
                        <div className="w-100 p-2 rounded-2 bg-light d-flex gap-2">
                            <img src={image.url} width={60} height={60} className="object-cover rounded-2" alt={image.name} />
                            <div className="d-flex flex-column justify-content-center flex-grow-1">
                                <div className="fs-5">{image.name}</div>
                                <span className="text-muted">{image.size}</span>
                            </div>
                            <Button type="button" size="sm" className="btn-icon my-auto" color="danger" onClick={() => deleteImage(image)}>
                                <i className="ri-close-fill"></i>
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
});

export default FormInputFile;
