import { ICar, IWinner, IWinnerInfo } from '../../types/index';
import {
    CARS, SERVER, WINNERS, WPAGE
} from '../constants';

export default class WinnerModel {
    winners;

    garage;

    constructor() {
        this.winners = `${SERVER}${WINNERS}`;
        this.garage = `${SERVER}${CARS}`;
    }

    async getWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'GET'
        });
        const winner = await response.json();
        return winner;
    }

    async getWinners() {
        const response = await fetch(`${this.winners}?_page=${WPAGE.number}&_limit=${WPAGE.limit}`, {
            method: 'GET'
        });
        const winners = await response.json();
        return winners;
    }

    async getFullWinnerInfo(winner: IWinner) {
        const resultG = await fetch(`${this.garage}`);
        const cars = await resultG.json();
        const fullWinner: IWinnerInfo = {
            id: 0, name: '', color: '', wins: 0, time: 0
        };
            cars.forEach((car:ICar)=> {
                if (winner.id === car.id) {
                    fullWinner.id = car.id;
                    fullWinner.name = car.name;
                    fullWinner.color = car.color;
                    fullWinner.wins = winner.wins;
                    fullWinner.time = winner.time;
                }
        });
        return fullWinner;
    }

    async createWinner(body: IWinner) {
        const response = await fetch(this.winners, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const winner = await response.json();
        return winner;
    }

    async updateWinner(id: number, body: object) {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const winner = await response.json();
        return winner;
    }

    async deleteWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'DELETE'
        });
        const winner = await response.json();
        return winner;
    }
}
