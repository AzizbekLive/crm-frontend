import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from 'reactstrap';
import { useProfileStore } from '../../stores/profile';
//import images
import avatar1 from '../../assets/images/users/avatar-1.jpg';
import { Link } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom/dist';
import { useProfile } from '../Hooks/UserHooks';
const ProfileDropdown = () => {
    const navigate = useNavigate();
    const { userProfile, loading } = useProfile();

    const { logOutProfile } = useProfileStore();

    const [user, setUser] = useState({ name: '', username: '' });

    useEffect(() => {
        if (sessionStorage.getItem('authUser')) {
            setUser(userProfile);
        }
    }, [userProfile]);

    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const logoutHandler = () => {
        sessionStorage.clear();
        logOutProfile();
        navigate('/login');
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <div className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1} alt="Header Avatar" />
                        {loading ? (
                            <div className="ms-2">
                                <Spinner size={'sm'} />
                            </div>
                        ) : (
                            <span className="text-start ms-xl-2">
                                <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{`${user?.name} ${user?.surname}`}</span>
                                <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user?.role}</span>
                            </span>
                        )}
                    </div>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem>
                        <Link to="/profile" className="d-block">
                            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{' '}
                            <span className="align-middle text-dark">Profile</span>
                        </Link>
                    </DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem>
                        <Link to="/profile-settings" className="d-block">
                            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{' '}
                            <span className="align-middle text-dark">Settings</span>
                        </Link>
                    </DropdownItem>
                    <DropdownItem onClick={logoutHandler}>
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{' '}
                        <span className="align-middle" data-key="t-logout">
                            Logout
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;
