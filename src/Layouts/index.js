import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withRouter from '../Components/Common/withRouter';

//import Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import RightSidebar from '../Components/Common/RightSidebar';
import { useLayoutStore } from '../stores/layouts';

const Layout = (props) => {
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        sidebarVisibilitytype,
        changeLayout,
        changeSidebarTheme,
        changeLayoutMode,
        changeLayoutWidth,
        changeLayoutPosition,
        changeTopbarTheme,
        changeLeftsidebarSizeType,
        changeLeftsidebarViewType,
        changeSidebarImageType,
        changeSidebarVisibility,
    } = useLayoutStore();

    /*
    layout settings
    */
    useEffect(() => {
        if (
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topbarThemeType ||
            leftsidbarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType ||
            sidebarVisibilitytype
        ) {
            window.dispatchEvent(new Event('resize'));
            changeLeftsidebarViewType(leftSidebarViewType);
            changeLeftsidebarSizeType(leftsidbarSizeType);
            changeSidebarTheme(leftSidebarType);
            changeLayoutMode(layoutModeType);
            changeLayoutWidth(layoutWidthType);
            changeLayoutPosition(layoutPositionType);
            changeTopbarTheme(topbarThemeType);
            changeLayout(layoutType);
            changeSidebarImageType(leftSidebarImageType);
            changeSidebarVisibility(sidebarVisibilitytype);
        }
    }, [
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        sidebarVisibilitytype,
    ]);
    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value) => {
        changeLayoutMode(value);
        localStorage.setItem('theme', value);
    };

    const [headerClass, setHeaderClass] = useState('');
    // class add remove in header
    useEffect(() => {
        window.addEventListener('scroll', scrollNavigation, true);
    });
    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass('topbar-shadow');
        } else {
            setHeaderClass('');
        }
    }

    useEffect(() => {
        if (sidebarVisibilitytype === 'show' || layoutType === 'vertical' || layoutType === 'twocolumn') {
            document.querySelector('.hamburger-icon').classList.remove('open');
        } else {
            document.querySelector('.hamburger-icon').classList.add('open');
        }
    }, [sidebarVisibilitytype, layoutType]);

    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header headerClass={headerClass} layoutModeType={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} />
                <Sidebar layoutType={layoutType} />
                <div className="main-content">
                    {props.children}
                    <Footer />
                </div>
            </div>
            <RightSidebar />
        </React.Fragment>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default withRouter(Layout);
