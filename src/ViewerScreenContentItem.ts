export interface ResponsiveOptions {
  font: {
    lineHeight: number;
    size: number;
  };
  maxWidth: number; // percentage
  position: {
    horizontal: number; // percentage
    top: number; // percentage
  };
}

export interface ViewerScreenContentItem {
  animation?: '' | 'bounce' | 'countUp' | 'fade' | 'flip' | 'slide' | 'typewriter' | 'zoom';
  // conditions?: Condition[];
  // conditionsMatch: 'all' | 'any';
  delay: number; // seconds
  font: {
    colour: string;
    family: string;
    style: 'italic' | 'normal';
    weight: 'bold' | 'normal';
  };
  horizontalAlignment: 'center' | 'left' | 'right'; // controls text alignment, but also the anchor point for horizontal positioning
  id: string;
  order: number;
  screenSizes: {
    mobilePortrait: ResponsiveOptions;
    mobileLandscape?: ResponsiveOptions;
    tabletPortrait?: ResponsiveOptions;
    tabletLandscape?: ResponsiveOptions;
    desktopLandscape?: ResponsiveOptions;
  };
  text?: string; // Text or alt text
  type: 'image' | 'share' | 'text';
  url?: string;
}
