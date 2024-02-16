import Ship from "../modules/ship"

export default class Board{
    size = 0;
    ships = [];
    miss = [];
    hits = [];

    constructor(siz){
        this.size = siz
    }

    addship(size, cord, dir){
        let boat = new Ship(size)
        let coordinates = this.processcoordiates(size,cord,dir)
        boat.place(coordinates)
        this.ships.push(boat)

    }
  
    processcoordiates(size, cord,dir){
        let coordinate = cord
        let coordinates = []
        switch(dir){
            case 'N':
                for(let i = 0; i < size; i++){
                    coordinates.push(coordinate)
                    coordinate = structuredClone(coordinate)
                    coordinate[1] = coordinate[1] - 1
                }
                break;
            case 'S':
                for(let i = 0; i < size; i++){
                    coordinates.push(coordinate)
                    coordinate = structuredClone(coordinate)
                    coordinate[1] = coordinate[1] + 1
                }
                break;
            case 'E':
                for(let i = 0; i < size; i++){
                    coordinates.push(coordinate)
                    coordinate = structuredClone(coordinate)
                    coordinate[0] = coordinate[0] + 1
                }
                break;
            case 'W':
                for(let i = 0; i < size; i++){
                    coordinates.push(coordinate)
                    coordinate = structuredClone(coordinate)
                    coordinate[0] = coordinate[0] - 1
                }
                break;
        }

        if(this.ships != undefined){
        coordinates.forEach(c => {
            for(let i = 0; i < this.ships.length; i++){
                for(let j = 0; j < this.ships[i].size; j++){
                    if(c[0] == this.ships[i].cord[j][0] && c[1] == this.ships[i].cord[j][1]){
                        throw new Error("A ship already exists at these coordinates")
                    } 
                }
            }
        });
        }

        coordinates.forEach(c => {
            if(c[0] > this.size || c[1] > this.size){
                throw new Error("Coordinates are out of bounds")
            }
            if(c[0] < 0 || c[1] < 0){
                throw new Error("Coordinates are out of bounds")
            }
        })
        return coordinates
    }

    receiveattack(attackcord){
        for(let h = 0; h < this.hits.length; h++){
            if(attackcord[0] == this.hits[h][0] && attackcord[1] == this.hits[h][1]){
                throw new Error("A hit already exists at these coordinates")
            }
        }

        for(let k = 0; k < this.hits.length; k++){
            if(attackcord[0] == this.miss[k][0] && attackcord[1] == this.miss[k][1]){
                throw new Error("A miss already exists at these coordinates")
            } 
        }

        for(let i = 0; i < this.ships.length; i++){
            for(let j = 0; j < this.ships[i].size; j++){
                if(attackcord[0] == this.ships[i].cord[j][0] && attackcord[1] == this.ships[i].cord[j][1]){
                    this.ships[i].hit()
                    this.hits.push[attackcord]
                } 
            }
        }
        this.miss.push[attackcord]
    }

    allsunk(){
        if(this.ships == undefined) return
        for(let i = 0; i < this.ships.length; i++){
            if(this.ships[i].sunken == true) return true
        }
        return false
    }



}