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
  // match: 'allSearches' | 'anySearches' | 'allUsers';
  name: string;
  order: number;
  // searchIds: string[];
  // supportersMatched?: number;
  // supportersMatchedUpdate?: boolean;
}
