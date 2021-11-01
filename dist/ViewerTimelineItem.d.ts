import { ViewerScreenContentItem } from './ViewerScreenContentItem';
export interface TimelineItem {
    end?: boolean;
    item?: ViewerScreenContentItem;
    show: boolean;
    time: number;
}
