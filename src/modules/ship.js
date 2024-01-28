export default class Ship{
    constructor(size){
        this.size = size
        this.hitcount = 0
        this.sunken = false
    }

    hit(){
        this.hitcount = this.hitcount  + 1
        this.isunk()
    }

    isunk(){
        if(this.hitcount == this.size){
            this.sunken = true
            return true
        }
        else{
            this.sunken = false;
            return false
        }
    }
}
