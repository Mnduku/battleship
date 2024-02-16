import Board from "../modules/board"

export default class player{

    constructor(type){
        this.type = type;
    }

    createboard(size){
        this.board = new Board(size)
    }

    makemove(){
        if(this.type == "computer"){
            let moved = false
            while(moved == false){
                let x = Math.floor(Math.random() * this.board.size);
                let y = Math.floor(Math.random() * this.board.size);
                let cords = [x,y]
                moved = this.board.receiveattack(cords)
            }

        }
    }
}