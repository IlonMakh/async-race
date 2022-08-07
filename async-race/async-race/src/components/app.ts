import GarageControllers from './controller/garageControllers';
import HeaderControllers from './controller/headerControllers';
import SettingsControllers from './controller/settingsControllers';
import WinnersControllers from './controller/winnerControllers';
import GarageView from './view/garageView';
import HeaderView from './view/headerView';
import SettingsView from './view/settingsView';
import WinnersView from './view/winnersView';

export default class App {
    header: HeaderView;

    settings: SettingsView;

    garage: GarageView;

    winners: WinnersView;

    headerControllers: HeaderControllers;

    settingsControllers: SettingsControllers;

    garageControllers: GarageControllers;

    winnersControllers: WinnersControllers;

    constructor() {
        this.header = new HeaderView();
        this.settings = new SettingsView();
        this.garage = new GarageView();
        this.winners = new WinnersView();
        this.headerControllers = new HeaderControllers();
        this.settingsControllers = new SettingsControllers();
        this.garageControllers = new GarageControllers();
        this.winnersControllers = new WinnersControllers();
    }

    start() {
        this.header.drawHeader();
        this.settings.drawSettings();
        this.garage.drawGarage();
        this.winners.drawWinnersBlock();
    }

    listen() {
        this.headerControllers.addListenerGarage();
        this.headerControllers.addListenerWinners();
        this.settingsControllers.listenCreateBtn();
        this.settingsControllers.listenGenerateBtn();
        this.settingsControllers.listenUpdateBtn();
        this.settingsControllers.listenResetBtn();
        this.settingsControllers.listenRaceBtn();
        this.garageControllers.listenRemoveBtn();
        this.garageControllers.listenSelectBtn();
        this.garageControllers.listenPagination();
        this.garageControllers.listenStart();
        this.garageControllers.listenStop();
        this.winnersControllers.listenPagination();
        this.winnersControllers.listenSorting();
    }
}
