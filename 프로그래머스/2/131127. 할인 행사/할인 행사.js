// 1. 초기 discount에서 10개를 윈도우에 넣음
// 2. map을 만들어서 윈도우 안에 어떤상품이 몇개가 있는지 확인
// 3. 원하는 상품 & 개수가 모두 충족되면 answer+1
// 4. 한칸씩 뒤로 밀기 -> discount.length-1-10만큼

function solution(want, number, discount) {
    let answer = 0;
    const map = new Map();
    for(let i=0;i<10;i++){
        if(map.has(discount[i])){
            map.set(discount[i], map.get(discount[i]) + 1);
        }else{
            map.set(discount[i], 1)
        }
    }
    let left = 0;
    let right = 10;
    
    while(right <= discount.length){
        let isAll = true
        // 원하는 상품이 map안에 있는지 확인
        // 하나라도 없다면 isAll = false 후 break
        // isAll이 false면 right와 left모두 1씩 증가해서 다음 날을 확인
        // isAll이 true라면 모든상품이 다 있는거임
        for(const w of want){
            if(!map.has(w)){
                isAll = false;
                break;
            }
        }
        if(!isAll){
            // left에 있는 상품을 map에서 제거해주고 증가
            const leftContent = discount[left];
            map.set(leftContent, map.get(leftContent) - 1)
            if(map.get(leftContent) === 0) map.delete(leftContent)
            
            left++;
            // right도 마찬가지
            const rightContent = discount[right];
            if(map.has(rightContent)){
            map.set(rightContent, map.get(rightContent) + 1)                
            }else{
                map.set(rightContent, 1)
            }
            right++;
            // 다음으로 넘김
            continue;
        }
        // 원하는 상품이 모두 있는 경우
        // want에서 찾는 수량이랑 map에 있는 수량 확인해서 map에 있는게 전부 다 많다면 answer + 1
        // 아니라면 left, right +1씩
        let isFull = true;
        for(let i=0;i<want.length;i++){
            const wantContent = want[i]
            const wantCount = number[i]
            const remainCount = map.get(wantContent);
            if(wantCount !== remainCount){
                isFull = false;
                break;
            }
        }
         if(!isFull){
                  // left에 있는 상품을 map에서 제거해주고 증가
            const leftContent = discount[left];
            map.set(leftContent, map.get(leftContent) - 1)
                         if(map.get(leftContent) === 0) map.delete(leftContent)

            left++;
            // right도 마찬가지
            const rightContent = discount[right];
            if(map.has(rightContent)){
            map.set(rightContent, map.get(rightContent) + 1)                
            }else{
                map.set(rightContent, 1)
            }
            right++;
            // 다음으로 넘김
            continue;
            }
            answer++;
             // left에 있는 상품을 map에서 제거해주고 증가
            const leftContent = discount[left];
            map.set(leftContent, map.get(leftContent) - 1)
            if(map.get(leftContent) === 0) map.delete(leftContent)
        
            left++;
            // right도 마찬가지
            const rightContent = discount[right];
            if(map.has(rightContent)){
            map.set(rightContent, map.get(rightContent) + 1)                
            }else{
                map.set(rightContent, 1)
            }
            right++;
        }
    return(answer)
    }
    
    
