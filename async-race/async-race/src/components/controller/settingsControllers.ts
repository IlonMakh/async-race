import { GETCARS, randomColor, randomName } from '../constants';
import CarModel from '../model/carModel';

export default class SettingsControllers {
    body;

    carModel: CarModel;

    constructor() {
        this.body = document.body;
        this.carModel = new CarModel();
    }

    listenCreateBtn() {
        const carName: HTMLInputElement = document.querySelector('.create_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.create_color') as HTMLInputElement;
        const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('create_btn')) {
                this.carModel.createCar({ name: carName.value, color: carColor.value });
                cars.innerHTML = '';
                GETCARS();
                carName.value = '';
                carColor.value = '#59ee45';
            }
        });
    }

    listenUpdateBtn() {
        const carName: HTMLInputElement = document.querySelector('.update_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.update_color') as HTMLInputElement;
        const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const id = +target.id;
            if (target.classList.contains('update_btn')) {
                this.carModel.updateCar(id, { name: carName.value, color: carColor.value });
                cars.innerHTML = '';
                GETCARS();
                carName.value = '';
                carColor.value = '#59ee45';
                target.id = '';
            }
        });
    }

    listenGenerateBtn() {
        const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('activity_generate')) {
                for (let i = 1; i <= 100; i += 1) {
                    this.carModel.createCar({ name: randomName(), color: randomColor() });
                }
                cars.innerHTML = '';
                GETCARS();
            }
        });
    }
}
