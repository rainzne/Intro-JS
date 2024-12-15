class Laser{
    constructor(x,y,angle,timeStart,timeAlt){
        this.x = x*32;
        this.y = y*32;
        this.angle = angle;
        this.timeAlt = timeAlt;
        this.clock = timeStart;
        this.img = new Image();
        this.laserCoord = [];
        if(this.angle == "down"){
            this.img.src = "./textures/tiles/laserdown.png";
        }else if(this.angle == "left"){
            this.img.src = "./textures/tiles/laserleft.png";
        }else if(this.angle == "right"){
            this.img.src = "./textures/tiles/laserright.png";
        }else{
            this.img.src = "./textures/tiles/laserup.png";
        }
        
    }

    // getClosestLaser(lasers){
    //     let closest = null;
    //     let dist = 36000;
    //     //console.log(lasers);
    //     for(let i = 0; i < laser.length; i++){
    //         let laser = lasers[i];
    //         if(laser !== this){
    //             //console.log("this",this);
    //             //console.log("other",laser);
    //             if(this.angle == "down"){
    //                 if(laser.y > this.y && laser.y - this.y < dist && laser.x == this.x){
    //                     closest = laser;
    //                     dist = laser.y - this.y;
    //                 }
    //             }else if(this.angle == "up"){
    //                 if(laser.y < this.y && this.y - laser.y < dist && laser.x == this.x){
    //                     closest = laser;
    //                     dist = this.y - laser.y;
    //                 }
    //             }else if(this.angle == "right"){
    //                 if(laser.x > this.x && laser.x - this.x < dist && laser.y == this.y){
    //                     closest = laser;
    //                     dist = laser.x - this.x;
    //                 }
    //             }else if(this.angle == "left"){
    //                 if(laser.x < this.x && this.x - laser.x < dist && laser.y == this.y){
    //                     closest = laser;
    //                     dist = this.x - laser.x;
    //                 }
    //             }
    //         }
    //     }
    //     console.log("returned",closest);
    //     return closest;
    // }

    getClosestObstacle(obstacles){
        //search for closet obstacle then return it, obstacle have coordinate that represent the top left corner
        //and width and height that represent the size of the obstacle
        let closest = null;
        let dist = 36000;
        for(let i = 0; i < obstacles.length; i++){
            let obstacle = obstacles[i];
            if(this.angle == "down"){
                if(obstacle.y > this.y && obstacle.y-this.y < dist && obstacle.x <= this.x && obstacle.x+obstacle.width >= this.x){
                    closest = obstacle;
                    dist = obstacle.y-this.y;
                }
            }else if(this.angle == "up"){
                if(obstacle.y < this.y && this.y-obstacle.y < dist && obstacle.x <= this.x && obstacle.x+obstacle.width >= this.x){
                    closest = obstacle;
                    dist = this.y-obstacle.y;
                }
            }else if(this.angle == "right"){
                if(obstacle.x > this.x && obstacle.x-this.x < dist && obstacle.y <= this.y && obstacle.y+obstacle.height >= this.y){
                    closest = obstacle;
                    dist = obstacle.x-this.x;
                }
            }else if(this.angle == "left"){
                if(obstacle.x < this.x && this.x-obstacle.x < dist && obstacle.y <= this.y && obstacle.y+obstacle.height >= this.y){
                    closest = obstacle;
                    dist = this.x-obstacle.x;
                }
            }
        }
        return closest;
    }

    nextAngle(){
        if(this.angle == "down"){
            this.angle = "left";
            this.img.src = "./textures/tiles/laserleft.png";
        }else if(this.angle == "left"){
            this.angle = "up";
            this.img.src = "./textures/tiles/laserup.png";
        }else if(this.angle == "up"){
            this.angle = "right";
            this.img.src = "./textures/tiles/laserright.png";
        }else{
            this.angle = "down";
            this.img.src = "./textures/tiles/laserdown.png";
        }
    }

    drawLaser(ctx,obstacles){
        ctx.fillStyle = "red";
        let closest = this.getClosestObstacle(obstacles);
        //let closest1 = this.getClosestObstacle(obstacles);
        //let closest2 = this.getClosestLaser(laser);
        //console.log(closest1,closest2);
        //if(Math.sqrt((this.x-closest1.x)^2)+((this.y-closest1.y)^2) < Math.sqrt((this.x-closest2.x)^2)+((this.y-closest2.y)^2)){
        //    var closest = closest1;
        //}else{
        //    var closest = closest2;
        //}
        if(closest != null){
            if(this.angle == "down"){
                this.laserCoord = [this.x+8,this.y+32,16,closest.y-this.y-32];
                ctx.fillRect(this.x+8,this.y+32,16,closest.y-this.y-32);
            }else if(this.angle == "up"){
                this.laserCoord = [this.x+8,closest.y+32,16,this.y-closest.y-32];
                ctx.fillRect(this.x+8,closest.y+32,16,this.y-closest.y-32);
            }else if(this.angle == "right"){
                this.laserCoord = [this.x+32,this.y+8,closest.x-this.x-32,16];
                ctx.fillRect(this.x+32,this.y+8,closest.x-this.x-32,16);
            }else if(this.angle == "left"){
                this.laserCoord = [closest.x+32,this.y+8,this.x-closest.x-32,16];
                ctx.fillRect(closest.x+32,this.y+8,this.x-closest.x-32,16);
            }
        }
    }

    draw(ctx,obstacles){
        this.clock = (this.clock+1)%(this.timeAlt*2);
        //console.log(this.clock);
        if(this.clock == 0){
            this.nextAngle();
        }
        ctx.drawImage(this.img,this.x,this.y);
        this.drawLaser(ctx,obstacles);
    }

}