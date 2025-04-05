// Convert a unix timestamp into a proper date
export const convertDate= (unix_timestamp: number)=> {
    const date = new Date(unix_timestamp * 1000)

    return {date: date, year:date.getFullYear()}
}

// Format hours
export const formatHours = (hours: number) => {
    return `${hours} hrs`
}