import { ViewerScreenContent } from './ViewerScreenContent';
export interface ViewerScreen {
    content: ViewerScreenContent;
    id: string;
    name: string;
    order: number;
}
