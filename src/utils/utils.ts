export function randomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function playSound(soundName: string) {
    let player = new Audio(soundName);
    player.volume = 0.08;
    player.play();
}