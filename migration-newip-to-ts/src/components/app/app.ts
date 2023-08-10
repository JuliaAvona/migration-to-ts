import AppController, { IController } from '../controller/controller';
import { AppView, IViewApp } from '../view/appView';

export interface IApp {
    controller: IController;
    view: IViewApp;
    start(): void;
}

class App implements IApp {
    public controller: IController;
    public view: IViewApp;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
