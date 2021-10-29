import { ViewerScreenContentItem } from './ViewerScreenContentItem';
export interface ViewerScreen {
    content: {
        backgroundColour: string;
        backgroundImage?: string;
        backgroundImageBrightness?: number;
        backgroundImageContrast?: number;
        items?: ViewerScreenContentItem[];
    };
    id: string;
    name: string;
    order: number;
}
