import Loader, { ILoader } from './loader';

class AppLoader extends Loader implements ILoader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '94195431586e4eff8c8220cbee116357', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
