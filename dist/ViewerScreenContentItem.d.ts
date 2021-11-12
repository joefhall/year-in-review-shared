import { ResponsiveOptions } from './ResponsiveOptions';
export interface ViewerScreenContentItem {
    animation?: '' | 'bounce' | 'countUp' | 'fade' | 'flip' | 'slide' | 'typewriter' | 'zoom';
    backgroundColour?: string;
    delay: number;
    font: {
        colour: string;
        family: string;
        style: 'italic' | 'normal';
        weight: 'bold' | 'normal';
    };
    horizontalAlignment: 'center' | 'left' | 'right';
    id: string;
    order: number;
    screenSizes: {
        mobilePortrait: ResponsiveOptions;
        mobileLandscape?: ResponsiveOptions;
        tabletPortrait?: ResponsiveOptions;
        tabletLandscape?: ResponsiveOptions;
        desktopLandscape?: ResponsiveOptions;
    };
    text?: string;
    type: 'image' | 'share' | 'text';
    url?: string;
}
