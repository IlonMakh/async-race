import { app } from '../../index';
import { ICar } from '../../types/index';
import { GPAGE, RAFID } from '../constants';
import CarModel from '../model/carModel';
import WinnerModel from '../model/winnerModel';
import { animateCar, GTOTALCOUNT, WTOTALCOUNT } from '../utils';

export default class GarageControllers {
    body: HTMLElement;

    carModel: CarModel;

    winnerModel: WinnerModel;

    drawGarage: () => Promise<void>;

    drawNextCar: () => Promise<void>;

    checkDriveStatus: (id: string, signal: AbortSignal) => Promise<boolean>;

    controller: AbortController;

    constructor() {
        this.body = document.body;
        this.carModel = new CarModel();
        this.winnerModel = new WinnerModel();
        this.drawGarage = async () => {
            const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
            const garagePage: HTMLElement = document.querySelector('.garage_page') as HTMLInputElement;
            const garage = await this.carModel.getCars();
            cars.innerHTML = '';
            garagePage.innerHTML = `Page #${GPAGE.number}`;
            return garage.forEach((item: ICar) => app.garage.drawCars(item));
        };
        this.drawNextCar = async () => {
            const index: number = GPAGE.number * GPAGE.limit - 1;
            const allCars = await this.carModel.getAllCars();
            if (allCars[index]) {
                app.garage.drawCars(allCars[index]);
            }
        };

        this.checkDriveStatus = async (id: string, signal: AbortSignal) => {
            const drive = await this.carModel.drive(+id, signal);
            if (drive) {
                if (!drive.success) {
                    await this.carModel.stopEngine(+id);
                    cancelAnimationFrame(RAFID[id]);
                    return false;
                }
                return true;
            }
            return false;
        };

        this.controller = new AbortController();
    }

    listenRemoveBtn(): void {
        const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
        const garageTitle: HTMLElement = document.querySelector('.garage_title') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('selection_remove')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                this.carModel.deleteCar(+car.id);
                cars.removeChild(car);
                app.garage.checkDisable();
                this.drawNextCar();
                garageTitle.innerHTML = `Garage(${await GTOTALCOUNT()})`;

                if (Object.keys(await this.winnerModel.getWinner(+car.id)).length !== 0) {
                    const winnersTitle: HTMLElement = document.querySelector('.winners_title') as HTMLInputElement;
                    this.winnerModel.deleteWinner(+car.id);
                    winnersTitle.innerHTML = `Winners(${await WTOTALCOUNT()})`;
                    app.winners.drawAllWinners();
                }
            }
        });
    }

    listenSelectBtn(): void {
        const carName: HTMLInputElement = document.querySelector('.update_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.update_color') as HTMLInputElement;
        const updateBtn: HTMLInputElement = document.querySelector('.update_btn') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('selection_select')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                const selectedCar = await this.carModel.getCar(+car.id);
                carName.value = selectedCar.name;
                carColor.value = selectedCar.color;
                updateBtn.id = `update${selectedCar.id}`;
            }
        });
    }

    listenStart(): void {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('move_start')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                const stopEngine: HTMLButtonElement = car.querySelector('.move_stop') as HTMLButtonElement;
                const move = await this.carModel.startEngine(+car.id);
                animateCar(car.id, car, move);
                stopEngine.disabled = false;
                target.disabled = true;
                this.checkDriveStatus(car.id, this.controller.signal);
            }
        });
    }

    listenStop(): void {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('move_stop')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                const carImage = car.querySelector('.move_icon') as HTMLElement;
                const startEngine: HTMLButtonElement = car.querySelector('.move_start') as HTMLButtonElement;
                await this.carModel.stopEngine(+car.id);
                cancelAnimationFrame(RAFID[car.id]);
                startEngine.disabled = false;
                target.disabled = true;
                carImage.style.transform = '';
                this.controller.abort();
                this.controller = new AbortController();
            }
        });
    }

    listenPagination(): void {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const count = await GTOTALCOUNT();
            const target = event.target as HTMLElement;
            if (target.classList.contains('pagination_prev')) {
                if (GPAGE.number > 1) {
                    GPAGE.number -= 1;
                    this.drawGarage();
                }
            }
            if (target.classList.contains('pagination_next')) {
                if (GPAGE.number <= Math.ceil(count / GPAGE.limit)) {
                    GPAGE.number += 1;
                    this.drawGarage();
                }
            }
        });
    }
}
