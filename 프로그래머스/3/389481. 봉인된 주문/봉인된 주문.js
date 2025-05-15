function wordToNum(word){
    const N = word.length;
    let result = 0;
    for(let i=N-1;i>=0;i--){
        const offset = word[i].charCodeAt() - 'a'.charCodeAt()+1;
        const temp = (N-1) - i
        result += Math.pow(26,temp)*offset
    }
    return result;
}

function numToWord(num){
    let length = 1;
    let temp = 26;
    
    while(num > temp){
        length++;
        temp += Math.pow(26,length)
    }
    
    const N = length;
    
    let prevSum = 0;
    for(let i=1;i<N;i++){
        prevSum += Math.pow(26,i)
    }
    let offset = num - prevSum - 1;
    
     let word = "";
  for (let pos = N - 1; pos >= 0; pos--) {
    const pow = Math.pow(26, pos);
    const idx = Math.floor(offset / pow);   
    word += String.fromCharCode(97 + idx);  
    offset %= pow;
  }
  

  return word;
}

function solution(n, bans) {
    const temp = []
    for(const b of bans){
            temp.push(wordToNum(b))
    }
    
    temp.sort((a,b) => a-b)
    
    for(const t of temp){
        if(t <= n) n++;
    }
    return(numToWord(n))
    
    
}

