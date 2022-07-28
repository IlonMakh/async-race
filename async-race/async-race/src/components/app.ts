import GarageView from './view/garageView';
import HeaderView from './view/headerView';
import SettingsView from './view/settingsView';

export default class App {
    header: HeaderView;

    settings: SettingsView;

    garage: GarageView;

    constructor() {
        this.header = new HeaderView();
        this.settings = new SettingsView();
        this.garage = new GarageView();
    }

    start() {
        this.header.drawHeader();
        this.settings.drawSettings();
        this.garage.drawGarage();
    }
}
