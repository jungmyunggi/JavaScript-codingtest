// 비행기는 ICN에서 출발
// 티켓은 [a,b]형태로 주어지며 a->b로 가는비행기임
// ex_ ICN에서 SFO, ATL 두가지 경로로 갈수있으면 오름차순으로 출력


// 1. 모든 티켓을 사용해서 여행하는 경로를 찍어야함
// 2. map에 공항별로 갈 수 있는 다른 공항 찍어주기
// 3. 모든 경로 탐색할거임 -> 이때 티켓을 모두 사용하는 경로만 따로 뽑음
// 4. 여기서 알파벳 정렬이 가장 잘된놈 뽑아 쓸거임

function getRoute(map, N){
    const result = []
    
    function finder(map, path, current){
        if(path.length === N){
            result.push([...path])
            return;
        }
        if(!map.has(current)) return;
        const nextPathArr = [...map.get(current)];
        for(let i=0;i<nextPathArr.length;i++){
            if(nextPathArr[i] === "check") continue;
            const temp = nextPathArr[i];
            path.push(nextPathArr[i]);
            nextPathArr[i] = "check";
            map.set(current, nextPathArr);
            finder(map, path, temp);
            path.pop();
            nextPathArr[i] = temp;
            map.set(current, nextPathArr)
        }
    }
    finder(map,["ICN"], "ICN")
    return result
}

function solution(tickets) {
    const map = new Map()
    for(const [from, to]of tickets){
        if(map.has(from)){
            map.set(from, [...map.get(from), to])
        }else{
            map.set(from, [to])
        }
    }
    
    
    const result = getRoute(map, tickets.length+1)
    
    const answer = []
    
    for(const r of result){
        let temp = r.join(" ");
        answer.push(temp)
    }
    answer.sort()
    return(answer[0].split(" "))
    
}