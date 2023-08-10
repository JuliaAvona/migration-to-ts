import { IOptions } from '../../interfaces-api/index';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface IgetResp extends IOptions {
    endpoint: string;
    options?: IOptions;
}

export interface ILoader {
    baseLink: string;
    options: IOptions;
    getResp({ endpoint, options }: IgetResp, callback?: () => void): void;
    errorHandler(res: Response): void;
    makeUrl(endpoint: string, options?: IOptions): string;
    load(method: string, endpoint: string, callback: (data: unknown) => void, options: IOptions): void;
}

class Loader implements ILoader {
    public baseLink: string;
    public options: IOptions;

    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: IgetResp,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(Method.GET, endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(endpoint: string, options?: IOptions): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        if (urlOptions) {
            Object.keys(urlOptions).forEach((key) => {
                url += `${key}=${urlOptions[key as keyof IOptions]}&`;
            });
        }

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: string, callback: (data?: unknown) => void, options?: IOptions) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data?: unknown) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;
