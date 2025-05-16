function solution(people, limit) {
    people.sort((a,b) => a-b);
    let count = 0;
    
    let left = 0;
    let right = people.length - 1;

    while(left <= right){
        let p1 = people[left];
        let p2 = people[right];

        if(p1 + p2 > limit){
            count++;
            right--;
        }else if(p1 + p2 <= limit){
            left++;
            right--;
            count++;
        }
    }
    


    return(count)
}
