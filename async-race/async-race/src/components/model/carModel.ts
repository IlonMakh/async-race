import { CARS, SERVER } from '../constants';

export default class CarModel {
    garage;

    constructor() {
        this.garage = `${SERVER}${CARS}`;
    }

    async getCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'GET'
        });
        const car = await response.json();
        return car;
    }

    async createCar(body: object) {
        const response = await fetch(this.garage, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const car = await response.json();
        return car;
    }

    async updateCar(id: number, body: object) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const car = await response.json();
        return car;
    }

    async deleteCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'DELETE'
        });
        const car = await response.json();
        return car;
    }
}
