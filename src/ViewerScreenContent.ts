import { ViewerScreenContentItem } from './ViewerScreenContentItem';
import { ViewerTimelineItem } from './ViewerTimelineItem';

export interface ViewerScreenContent {
  backgroundColour: string; // hex
  backgroundImage?: string; // url
  backgroundImageBrightness?: number; // -1 to 1
  backgroundImageContrast?: number; // -1 to 1
  delayAfterLastItem: number; // seconds
  items?: ViewerScreenContentItem[];
  timeline?: ViewerTimelineItem[];
}
