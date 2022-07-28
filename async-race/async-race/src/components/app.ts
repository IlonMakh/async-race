import HeaderView from './view/headerView';

export default class App {
    header;

    constructor() {
        this.header = new HeaderView();
    }

    start() {
        this.header.drawHeader();
    }
}
