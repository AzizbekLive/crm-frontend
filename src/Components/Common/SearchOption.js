import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import image2 from '../../assets/images/users/avatar-2.jpg';
import image3 from '../../assets/images/users/avatar-3.jpg';
import image5 from '../../assets/images/users/avatar-5.jpg';

const SearchOption = () => {
    const [value, setValue] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const inputRef = useRef(null);
    const closeRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setDropdownVisible(newValue.length > 0);
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
        <form className="app-search d-none d-md-block" onSubmit={(e) => e.preventDefault()}>
            <div className="position-relative" ref={inputRef}>
                <Input type="text" className="form-control" placeholder="Search..." value={value} onChange={handleInputChange} />
                <span className="mdi mdi-magnify search-widget-icon"></span>
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
                        <div className="dropdown-header">
                            <h6 className="text-overflow text-muted mb-0 text-uppercase">Recent Searches</h6>
                        </div>

                        <div className="dropdown-item bg-transparent text-wrap">
                            <Link to="/" className="btn btn-soft-secondary btn-sm btn-rounded">
                                how to setup <i className="mdi mdi-magnify ms-1"></i>
                            </Link>
                            <Link to="/" className="btn btn-soft-secondary btn-sm btn-rounded">
                                buttons <i className="mdi mdi-magnify ms-1"></i>
                            </Link>
                        </div>

                        <div className="dropdown-header mt-2">
                            <h6 className="text-overflow text-muted mb-1 text-uppercase">Pages</h6>
                        </div>

                        <Link to="#" className="dropdown-item notify-item">
                            <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                            <span>Analytics Dashboard</span>
                        </Link>

                        <Link to="#" className="dropdown-item notify-item">
                            <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                            <span>Help Center</span>
                        </Link>

                        <Link to="#" className="dropdown-item notify-item">
                            <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                            <span>My account settings</span>
                        </Link>

                        <div className="dropdown-header mt-2">
                            <h6 className="text-overflow text-muted mb-2 text-uppercase">Members</h6>
                        </div>

                        <div className="notification-list">
                            {[
                                {
                                    image: image2,
                                    name: 'Angela Bernier',
                                    role: 'Manager',
                                },
                                {
                                    image: image3,
                                    name: 'David Grasso',
                                    role: 'Web Designer',
                                },
                                {
                                    image: image5,
                                    name: 'Mike Bunch',
                                    role: 'React Developer',
                                },
                            ].map((member, idx) => (
                                <Link to="#" key={idx} className="dropdown-item notify-item py-2">
                                    <div className="d-flex">
                                        <img src={member.image} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                        <div className="flex-1">
                                            <h6 className="m-0">{member.name}</h6>
                                            <span className="fs-11 mb-0 text-muted">{member.role}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </SimpleBar>

                    <div className="text-center pt-3 pb-1">
                        <Link to="/pages-search-results" className="btn btn-primary btn-sm">
                            View All Results <i className="ri-arrow-right-line ms-1"></i>
                        </Link>
                    </div>
                </div>
            )}
        </form>
    );
};

export default SearchOption;
