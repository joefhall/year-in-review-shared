import { ViewerScreenContentItem } from './ViewerScreenContentItem';
export interface ViewerScreenContent {
    backgroundColour: string;
    backgroundImage?: string;
    backgroundImageBrightness?: number;
    backgroundImageContrast?: number;
    delayAfterLastItem?: number;
    items?: ViewerScreenContentItem[];
}
