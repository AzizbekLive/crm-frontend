import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const SearchOptions = ({ initialValue = '', onInitialChange }) => {
    const [value, setValue] = useState(initialValue);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const inputRef = useRef(null);
    const closeRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setDropdownVisible(newValue.length > 0);
        onInitialChange(e);
    };

    const handleClearSearch = () => {
        setValue('');
        setDropdownVisible(false);
        inputRef.current?.focus();
    };

    const handleClickOutside = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <React.Fragment>
            <div className="kanban-search">
                <div className="position-relative" ref={inputRef}>
                    <Input type="text" className="form-control" placeholder="Search..." name="search" value={value} onChange={handleInputChange} />
                    <span className="ri-search-line search-widget-icon"></span>
                    {value.length > 0 && (
                        <span
                            className="mdi mdi-close-circle search-widget-icon search-widget-icon-close"
                            onClick={handleClearSearch}
                            ref={closeRef}
                            style={{ cursor: 'pointer' }}></span>
                    )}
                </div>
                {isDropdownVisible && (
                    <div className="dropdown-menu dropdown-menu-lg show" ref={dropdownRef}>
                        <SimpleBar style={{ height: '320px' }}>
                            <div className="dropdown-header mt-2">
                                <h6 className="text-overflow text-muted mb-2 text-uppercase">Search results</h6>
                            </div>

                            <div className="notification-list">
                                {[
                                    {
                                        name: 'Angela Bernier',
                                        role: 'Manager',
                                    },
                                    {
                                        name: 'David Grasso',
                                        role: 'Web Designer',
                                    },
                                    {
                                        name: 'Mike Bunch',
                                        role: 'React Developer',
                                    },
                                    {
                                        name: 'John Doe',
                                        role: 'Frontend',
                                    },
                                    {
                                        name: 'David Grasso',
                                        role: 'Web Designer',
                                    },
                                    {
                                        name: 'David Grasso',
                                        role: 'Web Designer',
                                    },
                                    {
                                        name: 'Mike Bunch',
                                        role: 'React Developer',
                                    },
                                ].map((member, idx) => (
                                    <Link to="#" key={idx} className="dropdown-item notify-item py-2">
                                        <div>
                                            <h6 className="m-0">{member.name}</h6>
                                            <span className="fs-11 mb-0 text-muted">{member.role}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </SimpleBar>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default SearchOptions;
