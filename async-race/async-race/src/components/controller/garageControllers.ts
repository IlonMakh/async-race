import { GETCARS } from '../constants';
import CarModel from '../model/carModel';

export default class GarageControllers {
    body;

    carModel: CarModel;

    constructor() {
        this.body = document.body;
        this.carModel = new CarModel();
    }

    listenRemoveBtn() {
        const cars: HTMLElement = document.querySelector('.garage_cars') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('selection_remove')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                this.carModel.deleteCar(+car.id);
                cars.innerHTML = '';
                GETCARS();
            }
        });
    }

    listenSelectBtn() {
        const carName: HTMLInputElement = document.querySelector('.update_input') as HTMLInputElement;
        const carColor: HTMLInputElement = document.querySelector('.update_color') as HTMLInputElement;
        const updateBtn:HTMLInputElement = document.querySelector('.update_btn') as HTMLInputElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('selection_select')) {
                const car: HTMLElement = target.closest('.car') as HTMLElement;
                const selectedCar = await this.carModel.getCar(+car.id);
                carName.value = selectedCar.name;
                carColor.value = selectedCar.color;
                updateBtn.id = selectedCar.id;
            }
        });
    }
}
