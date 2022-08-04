import { app } from '../../index';
import { ICar, raceData } from '../../types/index';
import {
    animateCar,
    RAFID, randomColor, randomName, TOTALCOUNT
} from '../constants';
import CarModel from '../model/carModel';

export default class SettingsControllers {
    body;

    carModel: CarModel;

    resetInputs;

    updateCar;

    constructor() {
        this.body = document.body;
        this.carModel = new CarModel();
        this.resetInputs = (name: HTMLInputElement, color: HTMLInputElement) => {
            name.value = '';
            color.value = '#59ee45';
        };
        this.updateCar = (car: HTMLElement, name: HTMLInputElement, color: HTMLInputElement) => {
            const updatedName: HTMLElement = car.querySelector('.selection_name') as HTMLElement;
            const updatedColor: HTMLElement = (car.querySelector('path') as unknown) as HTMLElement;
            updatedName.innerHTML = `${name.value}`;
            updatedColor.style.fill = `${color.value}`;
        };
    }

    listenCreateBtn() {
        const carName: HTMLInputElement = document.querySelector('.create_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.create_color') as HTMLInputElement;
        const garageTitle: HTMLElement = document.querySelector('.garage_title') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('create_btn')) {
                const newCar = await this.carModel.createCar({
                    name: carName.value,
                    color: carColor.value
                });
                if ((await TOTALCOUNT()) <= 7) {
                    app.garage.drawCars(newCar);
                }
                this.resetInputs(carName, carColor);
                garageTitle.innerHTML = `Garage(${await TOTALCOUNT()})`;
                app.garage.checkDisable();
            }
        });
    }

    listenUpdateBtn() {
        const carName: HTMLInputElement = document.querySelector('.update_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.update_color') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('update_btn')) {
                const id = +target.id.replace(/[\D]+/g, '');
                const updatedCar: HTMLElement = document.getElementById(`${id}`) as HTMLElement;
                await this.carModel.updateCar(id, { name: carName.value, color: carColor.value });
                target.removeAttribute('id');
                this.updateCar(updatedCar, carName, carColor);
                this.resetInputs(carName, carColor);
            }
        });
    }

    async listenRaceBtn() {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const cars: NodeListOf<HTMLElement> = document.querySelectorAll('.car');
            if (target.classList.contains('activity_race')) {
                const finishOrder: raceData[] = [];
                cars.forEach(async (car) => {
                    const startBtn = car.querySelector('.move_start') as HTMLButtonElement;
                    const stopBtn = car.querySelector('.move_stop') as HTMLButtonElement;
                    const move = await this.carModel.startEngine(+car.id);
                    const carTime = (move.distance / move.velocity) / 1000;
                    animateCar(car.id, car, move);
                    startBtn.disabled = true;
                    stopBtn.disabled = false;
                    const carStatus = await app.garageControllers.checkDriveStatus(car.id);
                    if (carStatus) {
                        finishOrder.push({ id: car.id, time: +carTime.toFixed(1) });
                        app.garage.drawWinModal(finishOrder);
                    }
                });
            }
        });
    }

    listenResetBtn() {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const cars: NodeListOf<HTMLElement> = document.querySelectorAll('.move_icon');
            const startBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.move_start');
            const stopBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.move_stop');
            if (target.classList.contains('activity_reset')) {
                Object.keys(RAFID).forEach(async (id) => {
                    await this.carModel.stopEngine(+id);
                    cancelAnimationFrame(RAFID[id]);
                    cars.forEach((car) => { car.style.transform = ''; });
                    startBtns.forEach((btn) => { btn.disabled = false; });
                    stopBtns.forEach((btn) => { btn.disabled = true; });
                });
            }
        });
    }

    listenGenerateBtn() {
        const garageTitle: HTMLElement = document.querySelector('.garage_title') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('activity_generate')) {
                const count = await TOTALCOUNT();
                const createdCars = [];
                for (let i = 1; i <= 100; i += 1) {
                    const car = this.carModel.createCar({
                        name: randomName(), color: randomColor()
                    });
                    createdCars.push(car);
                }
                const cars = await Promise.all(createdCars);
                garageTitle.innerHTML = `Garage(${await TOTALCOUNT()})`;
                if (count < 7) {
                    cars.forEach((car: ICar, index: number) => {
                        if (count + index + 1 <= 7) app.garage.drawCars(car);
                    });
                }
            }
        });
    }
}
