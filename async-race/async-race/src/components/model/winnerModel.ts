import { app } from '../../index';
import {
    ICar, IWinner, IWinnerInfo, raceData
} from '../../types/index';
import {
    CARS, SERVER, WINNERS, WPAGE, WTOTALCOUNT
} from '../constants';

export default class WinnerModel {
    winners;

    garage;

    setSorting;

    constructor() {
        this.winners = `${SERVER}${WINNERS}`;
        this.garage = `${SERVER}${CARS}`;
        this.setSorting = (sort: string, order: string) => {
            if (sort && order) return `&_sort=${sort}&_order=${order}`;
            return '';
        };
    }

    async getWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`);
        const winner = await response.json();
        return winner;
    }

    async getWinners() {
        const response = await fetch(`${this.winners}?_page=${WPAGE.number}&_limit=${WPAGE.limit}`);
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

    async checkWinner(winner: raceData) {
        const winnersTitle: HTMLElement = document.querySelector('.winners_title') as HTMLInputElement;
        const result = await this.getWinner(+winner.id);
        if (Object.keys(result).length === 0) {
            const createdWinner = await this.createWinner({
                id: +winner.id,
                wins: 1,
                time: winner.time
            });
            if ((await WTOTALCOUNT()) <= 10) {
                const winnerInfo = await this.getFullWinnerInfo(createdWinner);
                app.winners.drawWinner(winnerInfo);
            }
            app.winners.checkDisable();
            winnersTitle.innerHTML = `Winners(${await WTOTALCOUNT()})`;
        } else {
            const prevWins = result.wins;
            const prevTime = result.time;
            await this.updateWinner(+winner.id, {
                wins: prevWins + 1,
                time: prevTime < winner.time ? prevTime : winner.time
            });
            app.winners.drawAllWinners();
        }
    }
}
