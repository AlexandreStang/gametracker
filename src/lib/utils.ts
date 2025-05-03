// Convert a unix timestamp into a proper date
export const convertDate= (unix_timestamp: number)=> {
    return new Date(unix_timestamp * 1000)
}

// Format hours
export const formatHours = (hours: number) => {
    return `${hours} hrs`
}