function yell(msg) {
    try {
        console.log(msg.toUpperCase().repeat(3));
    } catch {
        console.log("Please pass a string next time!");
    }
}
yell("hello world! ");
yell(1234567890);