import { INewsResponse, ISourcesResponse } from '../../interfaces-api/index';
import News, { INews } from './news/news';
import Sources, { INewSources } from './sources/sources';

export interface IViewApp {
    news: INews;
    sources: INewSources;
    drawNews(data?: INewsResponse): void;
    drawSources(data?: ISourcesResponse): void;
}

export class AppView implements IViewApp {
    news: INews;
    sources: INewSources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: INewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: ISourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
