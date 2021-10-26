function* gen(n){
    for (let i=0;i<n;++i)
        yield i;
}
let nums = gen(10)
nums.next().value // 0
nums.next().value // 1
nums.next().value // 2