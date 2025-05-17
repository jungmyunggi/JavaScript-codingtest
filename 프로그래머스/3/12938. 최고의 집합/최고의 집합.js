function solution(n, s) {
    if(n === 1) return [s]
    const temp = Math.floor(s/n);
    if(temp === 0) return [-1]
    const answer = Array(n).fill(temp);
    for(let i=0;i < s%n ;i++){
        answer.pop()
    }
    for(let i=0;i < s%n ;i++){
        answer.push(temp+1)
    }
    
    return answer
}