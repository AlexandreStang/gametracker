export interface GameIGDB {
    id: number
    name: string
    slug: string
    first_release_date: number
    cover: CoverIGDB
    platforms: PlatformIGDB[]
    genres: GenreIGDB[]
    updated_at: number
}

export interface GenreIGDB {
    id: number
    name: string
    updated_at: number
}

export interface PlatformIGDB {
    id: number
    name: string
    updated_at: number
}

export interface CoverIGDB {
    id: number
    image_id: string
}
