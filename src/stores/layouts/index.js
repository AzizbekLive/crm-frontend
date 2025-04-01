import { create } from 'zustand';
import { changeHTMLAttribute } from './utils'; // Assuming this utility function exists
import {
    layoutTypes,
    leftSidebarTypes,
    layoutModeTypes,
    layoutWidthTypes,
    layoutPositionTypes,
    topbarThemeTypes,
    leftsidbarSizeTypes,
    leftSidebarViewTypes,
    leftSidebarImageTypes,
    preloaderTypes,
    sidebarVisibilitytypes,
} from '../../Components/constants/layout';

// Create Zustand store
export const useLayoutStore = create((set) => ({
    // Initial State
    layoutType: layoutTypes.VERTICAL,
    leftSidebarType: localStorage.getItem('theme') || leftSidebarTypes.LIGHT,
    layoutModeType: localStorage.getItem('theme') || layoutModeTypes.LIGHTMODE,
    layoutWidthType: layoutWidthTypes.FLUID,
    layoutPositionType: layoutPositionTypes.FIXED,
    topbarThemeType: topbarThemeTypes.LIGHT,
    leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
    leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
    leftSidebarImageType: leftSidebarImageTypes.NONE,
    preloader: preloaderTypes.DISABLE,
    sidebarVisibilitytype: sidebarVisibilitytypes.SHOW,

    // Actions
    changeLayout: (layout) => {
        try {
            if (layout === 'twocolumn') {
                document.documentElement.removeAttribute('data-layout-width');
            } else if (layout === 'horizontal') {
                document.documentElement.removeAttribute('data-sidebar-size');
            } else if (layout === 'semibox') {
                changeHTMLAttribute('data-layout-width', 'fluid');
                changeHTMLAttribute('data-layout-style', 'default');
            }
            changeHTMLAttribute('data-layout', layout);
            set({ layoutType: layout });
        } catch (error) {}
    },

    changeLayoutMode: (layoutMode) => {
        try {
            changeHTMLAttribute('data-layout-mode', layoutMode);
            set({
                layoutModeType: layoutMode,
                leftSidebarType: layoutMode,
            });
        } catch (error) {}
    },

    changeSidebarTheme: (theme) => {
        try {
            changeHTMLAttribute('data-sidebar', theme);
            set({ leftSidebarType: theme });
        } catch (error) {}
    },

    changeLayoutWidth: (layoutWidth) => {
        try {
            if (layoutWidth === 'lg') {
                changeHTMLAttribute('data-layout-width', 'fluid');
            } else {
                changeHTMLAttribute('data-layout-width', 'boxed');
            }
            set({ layoutWidthType: layoutWidth });
        } catch (error) {}
    },

    changeLayoutPosition: (layoutposition) => {
        try {
            changeHTMLAttribute('data-layout-position', layoutposition);
            set({ layoutPositionType: layoutposition });
        } catch (error) {}
    },

    changeTopbarTheme: (topbarTheme) => {
        try {
            changeHTMLAttribute('data-topbar', topbarTheme);
            set({ topbarThemeType: topbarTheme });
        } catch (error) {}
    },

    changeLeftsidebarSizeType: (leftsidebarSizetype) => {
        try {
            switch (leftsidebarSizetype) {
                case 'lg':
                    changeHTMLAttribute('data-sidebar-size', 'lg');
                    break;
                case 'md':
                    changeHTMLAttribute('data-sidebar-size', 'md');
                    break;
                case 'sm':
                    changeHTMLAttribute('data-sidebar-size', 'sm');
                    break;
                case 'sm-hover':
                    changeHTMLAttribute('data-sidebar-size', 'sm-hover');
                    break;
                default:
                    changeHTMLAttribute('data-sidebar-size', 'lg');
            }
            set({ leftsidbarSizeType: leftsidebarSizetype });
        } catch (error) {}
    },

    changeLeftsidebarViewType: (leftsidebarViewtype) => {
        try {
            changeHTMLAttribute('data-layout-style', leftsidebarViewtype);
            set({ leftSidebarViewType: leftsidebarViewtype });
        } catch (error) {}
    },

    changeSidebarImageType: (leftsidebarImagetype) => {
        try {
            changeHTMLAttribute('data-sidebar-image', leftsidebarImagetype);
            set({ leftSidebarImageType: leftsidebarImagetype });
        } catch (error) {}
    },

    changePreLoader: (preloaderTypes) => {
        try {
            changeHTMLAttribute('data-preloader', preloaderTypes);
            set({ preloader: preloaderTypes });
        } catch (error) {}
    },

    changeSidebarVisibility: (sidebarVisibilitytype) => {
        try {
            changeHTMLAttribute('data-sidebar-visibility', sidebarVisibilitytype);
            set({ sidebarVisibilitytype });
        } catch (error) {}
    },
}));
