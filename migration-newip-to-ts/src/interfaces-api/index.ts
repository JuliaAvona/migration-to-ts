export type nullOrStr = null | string;
type typeStatus = 'error' | 'ok';
export type HTMLElemOrNull = null | HTMLElement;

interface IFalseResponse<T = nullOrStr> {
    code?: T;
    message?: T;
}

export interface IOneArticle<T = nullOrStr> {
    source: {
        id: T;
        name: T;
    };
    author: T;
    title: T;
    description: T;
    url: string;
    urlToImage: T;
    publishedAt: string;
    content: T;
}

export interface IResponse<T = nullOrStr> extends IFalseResponse<T> {
    status: typeStatus;
    totalResults?: number;
    articles?: IOneArticle<T>[];
    sources?: ISources<T>[];
}

export interface INewsResponse<T = nullOrStr> extends IFalseResponse<T> {
    status: typeStatus;
    totalResults?: number;
    articles?: IOneArticle<T>[];
}

export interface ISources<T = nullOrStr> {
    id: string;
    name: T;
    description: T;
    url: T;
    category: T;
    country: T;
}

export interface ISourcesResponse<T = nullOrStr> extends IFalseResponse<T> {
    status: typeStatus;
    sources?: ISources<T>[];
}

export interface IOptions<T = string> {
    apiKey?: T;
    q?: T;
    searchIn?: T;
    sources?: T;
    domains?: T;
    excludeDomains?: T;
    from?: T;
    to?: T;
    language?: T;
    sortBy?: T;
    pageSize?: T;
    page?: T;
}
