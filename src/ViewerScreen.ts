import { ViewerScreenContentItem } from './ViewerScreenContentItem';

export interface ViewerScreenContent {
  backgroundColour: string;
  backgroundImage?: string;
  backgroundImageBrightness?: number;
  backgroundImageContrast?: number;
  items?: ViewerScreenContentItem[];
}

export interface ViewerScreen {
  content: ViewerScreenContent;
  id: string;
  name: string;
  order: number;
}
