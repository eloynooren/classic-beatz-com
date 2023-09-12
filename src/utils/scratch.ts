
console.log("start")
for (let i =0; i < 10; i++) {
    let a = Math.random()
    let b = new Date().getTime()
    console.log(a, b, Math.floor(a * 25), Math.floor((a * b) % 25))
}
