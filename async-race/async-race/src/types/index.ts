export interface ICar {
    name: string;
    color: string;
    id: number;

}

export interface IWinner {
    id: number;
    wins: number;
    time: number;
}

export interface IWinnerInfo {
    id: number;
    wins: number;
    time: number;
    name: string;
    color: string;
}

export interface IDrive {
    velocity: number;
    distance: number;
}

export type rafid = {
    [key: string] : number;
}

export type raceData = {
    id: string;
    time: number;
}
