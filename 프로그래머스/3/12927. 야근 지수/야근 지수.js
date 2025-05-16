// 피로도는 야근을 시작한 시점에서 남은 일의 작업량을 제곱하여 더한 값
// N시간 동안 야근 피로도를 최소로 하도록 일할거다
// 1시간에 1만큼 처리가능
// 퇴근까지 남은 N시간과 각 작업량이 주어질 때 야근 피로도를 최소화한 값을 리턴


// 1. works 오름차순 정렬 -> max힙 써서 구하자
// 2. 가장 큰 수 - 1 && n - 1
// 3. n이 0이 되거나 가장 큰 수가 0이 될 때 까지 1~2 반복
// 4. 반복문이 끝나면 숫자 제곱 해서 다 더해주고 반환


class Heap {
    constructor(){
        this.heap = [null];
    }
    getParentIndex(index){
        return Math.floor(index/2);
    }
    getLeftIndex(index){
        return index * 2
    }
    getRightIndex(index){
        return index * 2 + 1
    }
    getSize(){
        return this.heap.length - 1
    }
    swap(a,b){
        [this.heap[a],this.heap[b]] = [this.heap[b],this.heap[a]]
    }
    push(value){
        this.heap.push(value);
        this.bubble_up();
    }
    bubble_up(){
        let index = this.getSize();
        while(index > 1){
            let parent = this.getParentIndex(index);
            if(this.heap[index] > this.heap[parent]){
                this.swap(index, parent);
                index = parent
            }else{
                break;
            }
        }
    }
    pop(){
        if(this.getSize() === 0) return null;
        if(this.getSize() === 1) return this.heap.pop()
        const value = this.heap[1];
        const last = this.heap.pop();
        this.heap[1] = last;
        this.bubble_down();
        return value;
    }
    bubble_down(){
        let index = 1;
        while(index <= this.getSize()){
            let left = this.getLeftIndex(index);
            let right = this.getRightIndex(index);
            let max = index;
            
            if(left <= this.getSize() && this.heap[left] > this.heap[max]){
                max = left
            }
            if(right <= this.getSize() && this.heap[right] > this.heap[max]){
                max = right
            }
            if(max !== index){
                this.swap(max, index)
                index = max
            }else{
                break;
            }
        }
        
    }
    getHeap(){
        return this.heap;
    }
    
}

function solution(n, works) {
    const heap = new Heap()
    for(const w of works){
        heap.push(w)
    }
    while(n > 0){
        const max = heap.pop();
        if(max === 0) break;
        heap.push(max - 1)
        n--;
    }
    
    const result = heap.getHeap()
    const answer = result.reduce((a,b) => a += Math.pow(b,2),0)
    return answer;
}