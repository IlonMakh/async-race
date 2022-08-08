import { app } from '../../index';
import { IWinner } from '../../types/index';
import { SORTING, WPAGE } from '../constants';
import WinnerModel from '../model/winnerModel';
import { WTOTALCOUNT } from '../utils';

export default class WinnersControllers {
    body: HTMLElement;

    drawWinnersPage: () => Promise<void>;

    winnerModel: WinnerModel;

    constructor() {
        this.body = document.body;
        this.winnerModel = new WinnerModel();
        this.drawWinnersPage = async () => {
            const winnersTable: HTMLElement = document.querySelector('.winners_content') as HTMLElement;
            const winnersPage: HTMLElement = document.querySelector('.winners_page') as HTMLInputElement;
            const winners = await this.winnerModel.getWinners();
            winnersTable.innerHTML = '';
            winnersPage.innerHTML = `Page #${WPAGE.number}`;
            winners.map(async (winner: IWinner) => {
                const winnerInfo = await this.winnerModel.getFullWinnerInfo(winner);
                app.winners.drawWinner(winnerInfo);
            });
        };
    }

    listenSorting(): void {
        const timeSorter = document.querySelector('.time_header') as HTMLElement;
        const winsSorter = document.querySelector('.wins_header') as HTMLElement;
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('wins_header')) {
                timeSorter.innerHTML = 'Best time';
                if (!target.classList.contains('asc')) {
                    target.classList.add('asc');
                    target.innerHTML = 'Wins ↑';
                    SORTING.sortBy = 'wins';
                    SORTING.order = 'asc';
                    app.winners.drawAllWinners();
                } else {
                    target.classList.remove('asc');
                    target.classList.add('desc');
                    target.innerHTML = 'Wins ↓';
                    SORTING.sortBy = 'wins';
                    SORTING.order = 'desc';
                    app.winners.drawAllWinners();
                }
            }
            if (target.classList.contains('time_header')) {
                winsSorter.innerHTML = 'Wins';
                if (!target.classList.contains('asc')) {
                    target.classList.add('asc');
                    target.innerHTML = 'Best time ↑';
                    SORTING.sortBy = 'time';
                    SORTING.order = 'asc';
                    app.winners.drawAllWinners();
                } else {
                    target.classList.remove('asc');
                    target.classList.add('desc');
                    target.innerHTML = 'Best time ↓';
                    SORTING.sortBy = 'time';
                    SORTING.order = 'desc';
                    app.winners.drawAllWinners();
                }
            }
        });
    }

    listenPagination(): void {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const count = await WTOTALCOUNT();
            const target = event.target as HTMLElement;
            if (target.classList.contains('winners_prev')) {
                if (WPAGE.number > 1) {
                    WPAGE.number -= 1;
                    this.drawWinnersPage();
                }
            }
            if (target.classList.contains('winners_next')) {
                if (WPAGE.number <= Math.ceil(count / WPAGE.limit)) {
                    WPAGE.number += 1;
                    this.drawWinnersPage();
                }
            }
        });
    }
}
