import { app } from '../../index';
import { ICar, IWinner, IWinnerInfo, raceData } from '../../types/index';
import { CARS, SERVER, SORTING, WINNERS, WPAGE } from '../constants';
import { WTOTALCOUNT } from '../utils';

export default class WinnerModel {
    winners: string;

    garage: string;

    setSorting: (sort: string, order: string) => string;

    constructor() {
        this.winners = `${SERVER}${WINNERS}`;
        this.garage = `${SERVER}${CARS}`;
        this.setSorting = (sort: string, order: string) => {
            if (sort && order) return `&_sort=${sort}&_order=${order}`;
            return '';
        };
    }

    async getWinner(id: number): Promise<IWinner> {
        const response = await fetch(`${this.winners}/${id}`);
        const winner = await response.json();
        return winner;
    }

    async getWinners(): Promise<IWinner[]> {
        const sort = this.setSorting(SORTING.sortBy, SORTING.order);
        const response = await fetch(`${this.winners}?_page=${WPAGE.number}&_limit=${WPAGE.limit}${sort}`);
        const winners = await response.json();
        return winners;
    }

    async getFullWinnerInfo(winner: IWinner): Promise<IWinnerInfo> {
        const resultG = await fetch(`${this.garage}`);
        const cars = await resultG.json();
        const fullWinner: IWinnerInfo = {
            id: 0,
            name: '',
            color: '',
            wins: 0,
            time: 0,
        };
        cars.forEach((car: ICar) => {
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

    async createWinner(body: IWinner): Promise<IWinner> {
        const response = await fetch(this.winners, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const winner = await response.json();
        return winner;
    }

    async updateWinner(id: number, body: object): Promise<IWinner> {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const winner = await response.json();
        return winner;
    }

    async deleteWinner(id: number) {
        const response = await fetch(`${this.winners}/${id}`, {
            method: 'DELETE',
        });
        const winner = await response.json();
        return winner;
    }

    async checkWinner(winner: raceData): Promise<void> {
        const winnersTitle: HTMLElement = document.querySelector('.winners_title') as HTMLInputElement;
        const result = await this.getWinner(+winner.id);
        if (!Object.keys(result).length) {
            const createdWinner = await this.createWinner({
                id: +winner.id,
                wins: 1,
                time: winner.time,
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
                time: prevTime < winner.time ? prevTime : winner.time,
            });
            app.winners.drawAllWinners();
        }
    }
}
