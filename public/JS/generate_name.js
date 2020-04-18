const names = ["Saul Goodman", "Kim Wexler", "Walter White", "Jesse Pinkman", "BoJack Horseman", "Mr. Peanutbutter", "Todd Chavez", "Guest01", "Anthony Kiedis", "McLovin", "Patrick"];

const generateRandomName = () => {
    const length = names.length;
    const random_name = names[Math.floor(Math.random() * length)];

    return random_name;
}

export default generateRandomName

