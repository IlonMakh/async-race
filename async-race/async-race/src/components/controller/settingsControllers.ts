import { app } from '../../index';
import { ICar, IWinner, raceData } from '../../types/index';
import {
    animateCar, RAFID, randomColor, randomName, GTOTALCOUNT, WTOTALCOUNT
} from '../constants';
import CarModel from '../model/carModel';
import WinnerModel from '../model/winnerModel';

export default class SettingsControllers {
    body;

    carModel: CarModel;

    winnerModel: WinnerModel;

    resetInputs;

    updateCar;

    updateWinner;

    checkWinner;

    constructor() {
        this.body = document.body;
        this.carModel = new CarModel();
        this.winnerModel = new WinnerModel();
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

        this.updateWinner = (id: number, name: HTMLInputElement, color: HTMLInputElement) => {
            if (document.getElementById(`${id}winner`)) {
                const winner = document.getElementById(`${id}winner`) as HTMLElement;
                const winnerName = winner.querySelector('.winner_name') as HTMLElement;
                const winnerCar = (winner.querySelector('path') as unknown) as HTMLElement;
                winnerName.innerHTML = `${name.value}`;
                winnerCar.style.fill = `${color.value}`;
            }
        };

        this.checkWinner = async (winner: raceData) => {
            const result = await this.winnerModel.getWinner(+winner.id);
            if (Object.keys(result).length === 0) {
                const createdWinner = await this.winnerModel.createWinner({
                    id: +winner.id,
                    wins: 1,
                    time: winner.time
                });
                if ((await WTOTALCOUNT()) <= 10) {
                    const winnerInfo = await this.winnerModel.getFullWinnerInfo(createdWinner);
                    app.winners.drawWinner(winnerInfo);
                }
            } else {
                const getWinner: IWinner = await this.winnerModel.getWinner(+winner.id);
                const prevWins = getWinner.wins;
                const prevTime = getWinner.time;
                const winnerUpdate = await this.winnerModel.updateWinner(+winner.id, {
                    wins: prevWins + 1,
                    time: prevTime < winner.time ? prevTime : winner.time
                });
                app.winners.drawAllWinners();
            }
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
                if ((await GTOTALCOUNT()) <= 7) {
                    app.garage.drawCars(newCar);
                }
                this.resetInputs(carName, carColor);
                garageTitle.innerHTML = `Garage(${await GTOTALCOUNT()})`;
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
                this.updateWinner(id, carName, carColor);
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
                await Promise.all(
                    Array.from(cars).map(async (car) => {
                        const startBtn = car.querySelector('.move_start') as HTMLButtonElement;
                        const stopBtn = car.querySelector('.move_stop') as HTMLButtonElement;
                        const move = await this.carModel.startEngine(+car.id);
                        const carTime = move.distance / move.velocity / 1000;
                        animateCar(car.id, car, move);
                        startBtn.disabled = true;
                        stopBtn.disabled = false;
                        const carStatus = await app.garageControllers.checkDriveStatus(car.id);
                        if (carStatus) {
                            finishOrder.push({ id: car.id, time: +carTime.toFixed(1) });
                        }
                        if (finishOrder[0] && finishOrder.length === 1) {
                            app.garage.drawWinModal(finishOrder[0]);
                            this.checkWinner(finishOrder[0]);
                        }
                    })
                );
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
                    cars.forEach((car) => {
                        car.style.transform = '';
                    });
                    startBtns.forEach((btn) => {
                        btn.disabled = false;
                    });
                    stopBtns.forEach((btn) => {
                        btn.disabled = true;
                    });
                });
            }
        });
    }

    listenGenerateBtn() {
        const garageTitle: HTMLElement = document.querySelector('.garage_title') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('activity_generate')) {
                const count = await GTOTALCOUNT();
                const createdCars = [];
                for (let i = 1; i <= 100; i += 1) {
                    const car = this.carModel.createCar({
                        name: randomName(),
                        color: randomColor()
                    });
                    createdCars.push(car);
                }
                const cars = await Promise.all(createdCars);
                garageTitle.innerHTML = `Garage(${await GTOTALCOUNT()})`;
                if (count < 7) {
                    cars.forEach((car: ICar, index: number) => {
                        if (count + index + 1 <= 7) app.garage.drawCars(car);
                    });
                }
            }
        });
    }
}
