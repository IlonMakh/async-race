import { ICar, IDrive } from '../../types/index';
import { CARS, ENGINE, GPAGE, SERVER } from '../constants';

export default class CarModel {
    garage: string;

    engine: string;

    constructor() {
        this.garage = `${SERVER}${CARS}`;
        this.engine = `${SERVER}${ENGINE}`;
    }

    async getCar(id: number): Promise<ICar> {
        const response = await fetch(`${this.garage}/${id}`);
        const car = await response.json();
        return car;
    }

    async getCars(): Promise<ICar[]> {
        const response = await fetch(`${this.garage}?_page=${GPAGE.number}&_limit=${GPAGE.limit}`);
        const cars = await response.json();
        return cars;
    }

    async getAllCars(): Promise<ICar[]> {
        const response = await fetch(`${this.garage}`);
        const cars = await response.json();
        return cars;
    }

    async createCar(body: object): Promise<ICar> {
        const response = await fetch(this.garage, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const car = await response.json();
        return car;
    }

    async updateCar(id: number, body: object): Promise<ICar> {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const car = await response.json();
        return car;
    }

    async deleteCar(id: number): Promise<ICar> {
        const response = await fetch(`${this.garage}/${id}`, {
            method: 'DELETE',
        });
        const car = await response.json();
        return car;
    }

    async startEngine(id: number): Promise<IDrive> {
        const response = await fetch(`${this.engine}?id=${id}&status=started`, {
            method: 'PATCH',
        });
        const start = await response.json();
        return start;
    }

    async stopEngine(id: number): Promise<void> {
        const response = await fetch(`${this.engine}?id=${id}&status=stopped`, {
            method: 'PATCH',
        });
        const stop = await response.json();
        return stop;
    }

    async drive(id: number, cotrollerSignal: AbortSignal) {
        try {
            const response = await fetch(`${this.engine}?id=${id}&status=drive`, {
                method: 'PATCH',
                signal: cotrollerSignal,
            }).catch();
            return response.status !== 200 ? { success: false } : { ...(await response.json()) };
        } catch (err) {
            return null;
        }
    }
}
