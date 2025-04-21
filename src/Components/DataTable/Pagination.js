import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const Paginations = (props) => {
    const { t } = useTranslation();

    const [itemsPerPage, setItemsPerPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    // const totalItems = 50;
    // Total number of pages in your data set
    const totalPages = Math.ceil(props.totalItems / itemsPerPage) || 1;

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        props.currentPage(pageNumber);
        // Perform any action you need when a page is clicked (e.g., fetch data)
    };
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            props.currentPage(currentPage - 1);
            // Perform any action you need when the "Previous" button is clicked
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            props.currentPage(currentPage + 1);

            // Perform any action you need when the "Next" button is clicked
        }
    };
    const handleToBeginning = () => {
        setCurrentPage(1);
        props.currentPage(1);
        // Perform any action you need when the "To Beginning" button is clicked
    };

    const handleToEnd = () => {
        setCurrentPage(totalPages);
        props.currentPage(totalPages);
        // Perform any action you need when the "To End" button is clicked
    };

    const handlePerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        props.perPageChange(newItemsPerPage);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        // props.currentPage(1);
        // Perform any action you need when the "per page" value changes
    };

    useEffect(() => {
        if (!props?.page) return;
        setCurrentPage(props?.page);
    }, [props?.page]);

    useEffect(() => {
        setItemsPerPage(props?.itemsPerPage);
    }, [props?.itemsPerPage]);
    const renderPagination = () => {
        const pageNumbers = [];

        // Calculate the page numbers to display
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        // Render "To Beginning" button
        pageNumbers.push(
            <PaginationItem key="toBeginning">
                <PaginationLink onClick={handleToBeginning}>{'<<'}</PaginationLink>
            </PaginationItem>
        );
        pageNumbers.push(
            <PaginationItem key="previous">
                <PaginationLink previous onClick={handlePrevious} />
            </PaginationItem>
        );
        // Add ellipsis (...) if necessary
        if (startPage > 1) {
            pageNumbers.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => handleClick(1)}>{1}</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                pageNumbers.push(
                    <PaginationItem key="ellipsis-start" disabled>
                        <PaginationLink>{'...'}</PaginationLink>
                    </PaginationItem>
                );
            }
        }

        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem key={i} active={i === currentPage}>
                    <PaginationLink onClick={() => handleClick(i)}>{i}</PaginationLink>
                </PaginationItem>
            );
        }

        // Add ellipsis (...) if necessary
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <PaginationItem key="ellipsis-end" disabled>
                        <PaginationLink>{'...'}</PaginationLink>
                    </PaginationItem>
                );
            }
            pageNumbers.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => handleClick(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }
        // Render "Next" button
        pageNumbers.push(
            <PaginationItem key="next">
                <PaginationLink next onClick={handleNext} />
            </PaginationItem>
        );
        pageNumbers.push(
            <PaginationItem key="toEnd">
                <PaginationLink onClick={handleToEnd}>{'>>'}</PaginationLink>
            </PaginationItem>
        );

        return pageNumbers;
    };

    return (
        <div className={`d-flex justify-content-between align-items-center ${props?.noPadding ? '' : 'px-3'}`}>
            {props?.noText ? null : (
                <span>
                    {t('Showing items')} {'['} {(currentPage - 1) * itemsPerPage + 1} {' ... '}
                    {Math.min(currentPage * itemsPerPage, props.totalItems)} {'] ,'} {t('Total')} {props.totalItems}
                </span>
            )}
            <div className="d-flex align-item-center  justify-content-end">
                {props?.noSelect ? null : (
                    <form className="me-4">
                        <select
                            className="form-control p-0 text-center"
                            style={{ width: '42.8px', height: '35px' }}
                            value={`${itemsPerPage}`}
                            onChange={handlePerPageChange}>
                            {props.rangeOptions ? (
                                props.rangeOptions.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))
                            ) : (
                                <>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                </>
                            )}
                        </select>
                    </form>
                )}
                <Pagination size={props?.size ?? ''}>{renderPagination()}</Pagination>
            </div>
        </div>
    );
};

export default Paginations;
