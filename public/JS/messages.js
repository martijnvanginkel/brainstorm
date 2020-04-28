const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

const formatMessage = (message) => {
    return {
        message,
        top: randomNumber(0, 100),
        left: randomNumber(0, 100)
    }
}

const spawnMessage = (message) => {
    
}

export { formatMessage, spawnMessage }