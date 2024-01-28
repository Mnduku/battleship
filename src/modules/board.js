import Ship from "../modules/ship"

export default class Board{
    constructor(size){
        this.size = size
        this.map = [size][size]
        for(let i = 0; i < this.map.length(); i++){
            for(let k = 0; k < this.map.length(); k++){
                this.map[i][k] = false
            }
        }
        this.ships = [5]
    }

    placeship(type, clist){
        let newship =  new Ship(type)
        clist.array.forEach(element => {
            if(this.map[element[0]][element[1]] != false){
                return false
            }
        });
        clist.array.forEach(element => {
            this.map[element[0]][element[1]] = true      
        });
        this.ships.push(newship)
        return true
    }

    takehit(x,y){
        if(this.map[x][y] == true){
            return true
        } 
        else return false;
    }




}