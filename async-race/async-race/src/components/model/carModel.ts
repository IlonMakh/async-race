import {
    CARS, ENGINE, PAGE, SERVER
} from '../constants';

export default class CarModel {
    garage;

    engine;

    constructor() {
        this.garage = `${SERVER}${CARS}`;
        this.engine = `${SERVER}${ENGINE}`;
    }

    async getCar(id: number) {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'GET'
        });
        const car = await response.json();
        return car;
    }

    async getCars() {
        const response = await fetch(`${this.garage}?_page=${PAGE.number}&_limit=${PAGE.limit}`, {
            method: 'GET'
        });
        const cars = await response.json();
        return cars;
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

    async startEngine(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=started`, {
            method: 'PATCH'
        });
        const start = await response.json();
        return start;
    }

    async stopEngine(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=stopped`, {
            method: 'PATCH'
        });
        const stop = await response.json();
        return stop;
    }

    async drive(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=drive`, {
            method: 'PATCH'
        }).catch();
        return response.status !== 200 ? { success: false } : { ...(await response.json()) };
    }
}
