import { ViewerScreenContentItem } from './ViewerScreenContentItem';
export interface ViewerTimelineItem {
    end?: boolean;
    item?: ViewerScreenContentItem;
    show: boolean;
    time: number;
}
