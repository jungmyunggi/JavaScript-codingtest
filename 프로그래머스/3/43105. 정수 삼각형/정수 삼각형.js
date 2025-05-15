function solution(triangle) {
    let max = -Infinity;
    for(let level = 1;level < triangle.length;level++){
        for(let i = 0;i<triangle[level].length;i++){
            const leftParent =  triangle[level-1][i-1]?triangle[level-1][i-1]:0
            const rightParent = triangle[level-1][i]?triangle[level-1][i]:0
            if(leftParent >= rightParent){
                triangle[level][i] += leftParent
            }else{
                triangle[level][i] += rightParent            
            }
            max = Math.max(max,triangle[level][i])
        }
    }
    return(max)
}