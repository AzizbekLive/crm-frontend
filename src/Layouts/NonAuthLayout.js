import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';

//zustand
import { useLayoutStore } from '../stores/layouts';

const NonAuthLayout = ({ children }) => {
    const { layoutModeType } = useLayoutStore();

    useEffect(() => {
        if (layoutModeType === 'dark') {
            document.body.setAttribute('data-layout-mode', 'dark');
        } else {
            document.body.setAttribute('data-layout-mode', 'light');
        }
        return () => {
            document.body.removeAttribute('data-layout-mode');
        };
    }, [layoutModeType]);
    return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
