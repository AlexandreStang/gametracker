export interface Game {
    id: number;
    name: string;
    first_release_date?: number;
    platforms?: Platform[];
    genres?: Genre[];
    updated_at?: Date;
}

export interface Genre {
    id: number;
    name: string;
    updated_at?: Date;
}

export interface Platform {
    id: number;
    name: string;
    updated_at?: Date;
}

