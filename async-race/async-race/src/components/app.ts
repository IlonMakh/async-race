import HeaderView from './view/headerView';
import SettingsView from './view/settingsView';

export default class App {
    header: HeaderView;

    settings: SettingsView;

    constructor() {
        this.header = new HeaderView();
        this.settings = new SettingsView();
    }

    start() {
        this.header.drawHeader();
        this.settings.drawSettings();
    }
}
