function solution(board, skill) {
    const N = board.length;
    const M = board[0].length;
    
    const d = Array.from({length:N+1}, () => Array(M+1).fill(0))
    for(const s of skill){
        const [type, r1,c1,r2,c2,degree] = s;
        let temp = degree
        if(type === 1) temp *= -1;
        d[r1][c1] += temp;
        d[r1][c2+1] -= temp;
        d[r2+1][c1] -= temp;
        d[r2+1][c2+1] += temp;
    }
    for(let row = 0; row < N + 1;row++){
        for(let col = 1; col < M+1;col++){
            d[row][col] += d[row][col - 1];
        }
    }
    for(let row = 1; row < N + 1;row++){
        for(let col = 0; col < M+1;col++){
            d[row][col] += d[row-1][col];
        }
    }
    let answer = 0;
    for(let row = 0; row < N;row++){
        for(let col = 0; col < M;col++){
            board[row][col] += d[row][col]
            if(board[row][col] > 0) answer++;
        }
    }
    
    return answer
}