import { ViewerScreenContentItem } from './ViewerScreenContentItem';
import { ViewerTimelineItem } from './ViewerTimelineItem';
export interface ViewerScreenContent {
    backgroundColour: string;
    backgroundImage?: string;
    backgroundImageBrightness?: number;
    backgroundImageContrast?: number;
    delayAfterLastItem: number;
    items?: ViewerScreenContentItem[];
    timeline?: ViewerTimelineItem[];
}
