import React from 'react';
import { Supporter } from '../interfaces/Supporter';
import { ViewerScreenContentItem } from '../interfaces/ViewerScreenContentItem';
export declare const getItemContainerStyles: (item: ViewerScreenContentItem, screenSize: 'mobilePortrait' | 'mobileLandscape' | 'tabletPortrait' | 'tabletLandscape' | 'desktopLandscape') => React.CSSProperties;
export declare const getTextItemStyles: (item: ViewerScreenContentItem, screenSize: 'mobilePortrait' | 'mobileLandscape' | 'tabletPortrait' | 'tabletLandscape' | 'desktopLandscape') => React.CSSProperties;
export declare const insertSupporterContent: (supporter: Supporter, itemText: string | undefined, countUp?: boolean) => string;
export declare const renderAnimatedItem: (supporter: Supporter, item: ViewerScreenContentItem, screenSize: 'mobilePortrait' | 'mobileLandscape' | 'tabletPortrait' | 'tabletLandscape' | 'desktopLandscape', classNameExtra: string) => JSX.Element | null;
export declare const renderCountUp: (itemText: string) => JSX.Element;
export declare const renderItem: (supporter: Supporter, item: ViewerScreenContentItem, screenSize: 'mobilePortrait' | 'mobileLandscape' | 'tabletPortrait' | 'tabletLandscape' | 'desktopLandscape') => JSX.Element;
