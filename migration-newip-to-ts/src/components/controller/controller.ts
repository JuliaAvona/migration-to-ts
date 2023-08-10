import AppLoader from './appLoader';
import { INewsResponse, ISourcesResponse } from '../../interfaces-api/index';
import { ILoader } from './loader';

export interface IController extends ILoader {
    getSources(callback: (data?: ISourcesResponse) => void): void;
    getNews(e: Event, callback: (data?: INewsResponse) => void): void;
}

class AppController extends AppLoader implements IController {
    public getSources(callback: (data?: ISourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data?: INewsResponse) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
