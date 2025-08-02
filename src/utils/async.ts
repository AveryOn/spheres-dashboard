
/** Функция запускает ожидание в потоке */
export function sleep(seconds: number = 0) {
    return new Promise((res, _) => {
        setTimeout(res, seconds * 1000)
    })
}