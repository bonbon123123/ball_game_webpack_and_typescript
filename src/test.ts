
import SoftBlock from './softBlock'
import boardSize from './boardSize'
import { unique } from '../node_modules/typedoc/dist/lib/utils/array'
/**
 * Interface defining object, bALL
 * 
 *
 */
interface ballPosition {
    id: number
    x: number,
    y: number,
    color: string
}


let bulka: number = 1
/**
 * Class used for gaming😎
 * @param tab the element we want to block
 *
 */
export class Game {
    /**
 * number of destroyed balls
*/
    score: number
    /** 
     * array with all elements
    */
    tab: (ballPosition | number | string)[][] = []
    /**
 * array used for storing shortest patch to ball
*/
    positionTab: (number | string[] | string)[][] = []
    /**
* array used for storing divs. that are addet to scream
*/
    squareTab: HTMLDivElement[] = []
    /**
* div of board that game takes place on
*/
    board: HTMLDivElement = document.createElement('div');
    /**
* defines the stage of the game
*/
    stage: string = ""
    /**
* X of the ball i want to move
*/
    ballMovingX: number
    /**
* Y of the ball i want to move
*/
    ballMovingY: number
    /**
* id of every new ball
*/
    globalId: number = 0
    /**
* breakpoint for filling tab with numbers
*/
    breakpoint: boolean = false
    /**
* number of empty solts on the board
*/
    emptySlots: number = 0
    /**
* array of possible ball colors
*/
    colorArray: string[] = ['red', 'blue', 'green', 'red', 'yellow', 'orange', 'pink']
    /**
* array of balls
*/
    ballPositionTab: ballPosition[] = []

    /**
* div that stores balls that will apear next round
*/
    boxForNextBalls: HTMLDivElement = document.createElement('div');
    /**
* array of balls that will apear next round
*/
    tabForNextBalls: string[] = []
    /**
* object of class softblock
*/
    soft = new SoftBlock(this.board)


    /**
* prepares balls for next round
*/
    // @fliper
    private nextBalls() {

        this.tabForNextBalls = []
        for (let i: number = 0; i < 3; i++) {
            let myColor: string = this.colorArray[this.getRandomInt(0, 6)]
            this.tabForNextBalls.push(myColor)
        }
        this.fillBoxForNextBalls(this.tabForNextBalls)
    }
    /**
* fills div with balls for next round
*@param tabOfColors collors that will be used
*/
    private fillBoxForNextBalls(tabOfColors: any) {
        for (let i = 0; i < tabOfColors.length; i++) {
            let square: HTMLDivElement = document.createElement('div');
            square.className = "square";
            square.style.left = `${(i) * 50}px`
            square.style.backgroundColor = `${tabOfColors[i]}`
            square.style.borderRadius = "30%"
            this.boxForNextBalls.appendChild(square)
        }
    }
    /**
 * checks if gane sould end and randomizes positions of balls
 */
    private doNewBalls() {
        this.emptySlots = 0
        for (let i: number = 2; i <= 10; i++) {
            for (let j: number = 2; j <= 10; j++) {
                if (this.tab[i][j] == 0) {
                    this.emptySlots++
                }
            }
        }
        if (this.emptySlots > 3) {
            for (let i: number = 0; i < 3; i++) {
                let myX: number = this.getRandomInt(2, 10)
                let myY: number = this.getRandomInt(2, 10)
                let myColor: string = this.tabForNextBalls[i]
                if (this.tab[myY][myX] == 0) {
                    this.createBall(myX, myY, myColor)
                }
                else {
                    i--
                }
            }
            this.nextBalls()
        }
        else {
            alert(`Game OVER! Score:${this.score}`)
        }
    }
    /**
 * prepares instance of ballPosition

 */
    public createBall(myX: any, myY: any, myColor: any) {
        let ball: ballPosition
        ball = {
            id: this.globalId,
            x: myX,
            y: myY,
            color: myColor
        }
        this.globalId++
        this.ballPositionTab.push(ball)
        this.tab[myY][myX] = ball
    }
    /**
 * generates random int inclusive from range
 * @param min minimum int
 * @param max maximum int
 */
    private getRandomInt(min: any, max: any) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
 * changes all non 0 numbers form tab to 0

 */
    private clearNumbers() {
        for (let i: number = 0; i <= 12; i++) {
            for (let j: number = 0; j <= 12; j++) {
                if (typeof this.tab[i][j] == "number") {
                    this.tab[i][j] = 0;
                    this.positionTab[i][j] = []
                }
            }
        }
    }

    /**
 * fkickstarts the game
 */
    public start() {
        this.nextBalls()
        this.boxForNextBalls.className = "boxForNextBalls"
        document.body.appendChild(this.boxForNextBalls)
        this.board.style.position = "absolute";
        this.board.style.width = `${boardSize.BoardSize}`;
        this.board.style.height = `${boardSize.BoardSize}`;
        this.board.className = 'board'
        document.body.appendChild(this.board);
        for (let i: number = 0; i <= 12; i++) {
            this.tab[i] = [];
            this.positionTab[i] = []
            for (let j: number = 0; j <= 12; j++) {
                if (j == 0 || i == 0 || j == 1 || i == 1 || j == 11 || i == 11 || j == 12 || i == 12) {
                    this.tab[i][j] = "wall"
                    this.positionTab[i][j] = "wall"
                }
                else {
                    this.tab[i][j] = 0
                    this.positionTab[i][j] = []
                }
            }
        }


        for (let i: number = 0; i < 3; i++) {
            let myX: number = this.getRandomInt(2, 10)
            let myY: number = this.getRandomInt(2, 10)
            let myColor: string = this.colorArray[this.getRandomInt(0, 6)]
            if (this.tab[myY][myX] == 0) {
                this.createBall(myX, myY, myColor)
            }
            else {
                i--
            }
        }

        this.recreateBoard()
    }



    /**
     * draws board after all changes
     */
    //@flip
    private strike() {
        for (let j: number = 2; j <= 10; j++) {
            for (let i: number = 2; i <= 10; i++) {
                if ((this.tab[j][i] as ballPosition).color != undefined && (this.tab[j][i] as ballPosition).color == (this.tab[j + 1][i] as ballPosition).color && (this.tab[j][i] as ballPosition).color == (this.tab[j + 2][i] as ballPosition).color) {
                    let bonusStrikeTab: number[] = []
                    let myColor: string = (this.tab[j][i] as ballPosition).color
                    for (let x: number = 0; x <= 10; x++) {
                        if ((this.tab[j + x][i] as ballPosition).color != undefined && (this.tab[j + x][i] as ballPosition).color == myColor) {
                            if (this.tab[j + x][i - 2] != undefined) {
                                if ((this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i - 2] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i - 1] as ballPosition).color) {
                                    bonusStrikeTab.push(-2, -1)
                                }
                            }
                            if (this.tab[j + x][i - 2] != undefined && (this.tab[j + x][i + 1] as ballPosition).color != undefined) {
                                if ((this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i + 1] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i - 2] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i - 1] as ballPosition).color) {
                                    bonusStrikeTab.push(1, -2, -1)
                                }
                            }
                            if (this.tab[j + x][i + 2] != undefined && (this.tab[j + x][i - 1] as ballPosition).color != undefined) {
                                if ((this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i + 1] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i + 2] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i - 1] as ballPosition).color) {
                                    bonusStrikeTab.push(1, 2, -1)
                                }
                            }
                            if (this.tab[j + x][i + 2] != undefined) {
                                if ((this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i + 1] as ballPosition).color
                                    && (this.tab[j + x][i] as ballPosition).color == (this.tab[j + x][i + 2] as ballPosition).color) {
                                    bonusStrikeTab.push(1, 2)
                                }
                            }

                            bonusStrikeTab.push(0)

                            let uniqueStrikeTab: number[] = []
                            for (let c: number = 0; c < bonusStrikeTab.length; c++) {

                                if (!uniqueStrikeTab.includes(bonusStrikeTab[c])) {

                                    uniqueStrikeTab.push(bonusStrikeTab[c]);
                                }
                            }


                            for (let a: number = uniqueStrikeTab.length - 1; a >= 0; a--) {
                                this.tab[j + x][i + uniqueStrikeTab[a]] = 0
                                this.positionTab[j + x][i + uniqueStrikeTab[a]] = []
                                this.score++
                            }
                        }
                        else {
                            break
                        }
                    }

                }

                else if ((this.tab[j][i] as ballPosition).color != undefined &&
                    (this.tab[j][i] as ballPosition).color == (this.tab[j][i + 1] as ballPosition).color &&
                    (this.tab[j][i] as ballPosition).color == (this.tab[j][i + 2] as ballPosition).color) {
                    let bonusStrikeTab: number[] = []
                    let myColor: string = (this.tab[j][i] as ballPosition).color
                    for (let x: number = 0; x <= 10; x++) {

                        if ((this.tab[j][i + x] as ballPosition).color != undefined && (this.tab[j][i + x] as ballPosition).color == myColor) {
                            if (this.tab[j - 2][i + x] != undefined) {
                                if ((this.tab[j][i + x] as ballPosition).color == (this.tab[j - 2][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j - 1][i + x] as ballPosition).color) {
                                    bonusStrikeTab.push(-2, -1)
                                }
                            }
                            if (this.tab[j - 2][i + x] != undefined && (this.tab[j + 1][i + x] as ballPosition).color != undefined) {
                                if ((this.tab[j][i + x] as ballPosition).color == (this.tab[j + 1][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j - 2][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j - 1][i + x] as ballPosition).color) {
                                    bonusStrikeTab.push(1, -2, -1)
                                }
                            }
                            if (this.tab[j + 2][i + x] != undefined && (this.tab[j - 1][i + x] as ballPosition).color != undefined) {
                                if ((this.tab[j][i + x] as ballPosition).color == (this.tab[j + 1][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j + 2][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j - 1][i + x] as ballPosition).color) {
                                    bonusStrikeTab.push(1, 2, -1)
                                }
                            }
                            if (this.tab[j + 2][i + x] != undefined) {
                                if ((this.tab[j][i + x] as ballPosition).color == (this.tab[j + 1][i + x] as ballPosition).color
                                    && (this.tab[j][i + x] as ballPosition).color == (this.tab[j + 2][i + x] as ballPosition).color) {
                                    bonusStrikeTab.push(1, 2)
                                }
                            }

                            bonusStrikeTab.push(0)

                            let uniqueStrikeTab: number[] = []
                            for (let c: number = 0; c < bonusStrikeTab.length; c++) {

                                if (!uniqueStrikeTab.includes(bonusStrikeTab[c])) {

                                    uniqueStrikeTab.push(bonusStrikeTab[c]);
                                }
                            }


                            for (let a: number = uniqueStrikeTab.length - 1; a >= 0; a--) {

                                this.positionTab[j + uniqueStrikeTab[a]][i + x] = []
                                this.tab[j + uniqueStrikeTab[a]][i + x] = 0
                                this.score++
                            }
                        }
                        else {
                            break
                        }
                    }
                }
            }

            this.recreateBoard()
        }
    }
    private recreateBoard() {
        bulka = this.getRandomInt(-80, 40)
        this.board.innerHTML = ''
        this.soft.unblock()
        this.squareTab.forEach(v => v.remove())
        for (let i: number = 2; i <= 10; i++) {
            for (let j: number = 2; j <= 10; j++) {
                if (this.tab[i][j] == 0) {

                    let square: HTMLDivElement = document.createElement('div');
                    square.className = "square";
                    square.style.top = `${(i - 2) * 50}px`
                    square.style.left = `${(j - 2) * 50}px`
                    square.addEventListener("click", () => {
                        // console.log(this.positionTab[i][j])
                        // console.log("colored squares when clicked", (this.positionTab[i][j] as string[]).length)
                        if (this.stage == "firstClick" && (this.positionTab[i][j] as string[]).length != 0) {
                            let div: HTMLDivElement = document.createElement('div');
                            this.soft.block(div)
                            console.log("miejsce przesuneca ", this.tab[i][j])
                            if (this.tab[i][j] != 0) {
                                this.stage = "zeroClick"
                                let ball: ballPosition
                                ball = {
                                    id: (this.tab[this.ballMovingY][this.ballMovingX] as ballPosition).id,
                                    x: (this.tab[this.ballMovingY][this.ballMovingX] as ballPosition).x,
                                    y: (this.tab[this.ballMovingY][this.ballMovingX] as ballPosition).y,
                                    color: (this.tab[this.ballMovingY][this.ballMovingX] as ballPosition).color
                                }
                                this.tab[this.ballMovingY][this.ballMovingX] = 0
                                this.tab[i][j] = ball
                                this.clearNumbers()
                                this.doNewBalls()

                                this.squareTab.forEach(v => v.style.backgroundColor = "grey")
                                setTimeout(() => this.strike(), 1000)

                            }

                        }

                    })

                    square.addEventListener("mouseover", () => {
                        //console.log("colored squares when hover", this.positionTab.length)

                        this.colorPath(this.positionTab[i][j])
                        // if (stage == "firstClick" && this.tab[i][j] == 0) {



                        // }
                    })
                    this.board.append(square)

                }
                if (typeof this.tab[i][j] == "object") {
                    let square: HTMLDivElement = document.createElement('div');
                    square.className = "square";
                    square.style.top = `${(i - 2) * 50}px`
                    square.style.left = `${(j - 2) * 50}px`
                    square.style.backgroundColor = `${(this.tab[i][j] as ballPosition).color}`
                    square.style.borderRadius = "30%"
                    square.addEventListener("click", () => {
                        //console.log(typeof this.tab[i][j]);
                        //console.log((this.tab[i][j] as ballPosition).color)
                        this.clearNumbers()

                        console.log(this.positionTab)
                        console.log(this.positionTab[i][j])
                        this.positionTab[i][j] = [`${i}_${j}`]
                        this.pathStart(this.tab[i][j], i, j)
                        this.ballMovingY = i
                        this.ballMovingX = j
                        this.stage = "firstClick"

                    })
                    this.board.append(square)
                }
            }
        }
    }



    /**
* creates tomato collored path to cursor after l;ockin in the ball
* @param myPath path to selected endpoint
*/
    private colorPath(myPath: any) {

        this.squareTab.forEach(v => v.remove())
        for (let g: number = 1; g < myPath.length; g++) {

            let x: number = parseInt(myPath[g].split("_")[0])
            let y: number = parseInt(myPath[g].split("_")[1])
            //console.log(x, " i ", y)
            let square: HTMLDivElement = document.createElement('div');
            square.className = "path";
            square.style.top = `${(x - 2) * 50}px`
            square.style.left = `${(y - 2) * 50}px`
            square.style.backgroundColor = "tomato"
            this.squareTab.push(square)
            this.board.append(square)
        }

    }

    /** cycles thru whole board and fills tab with numbers and position tab with positions
* @param seeked current number we were seeking
* @param z starting value
* @param x starting value
*/
    private pathStart(seeked: any, z = 1, x = 1) {
        // console.log(typeof seeked)
        if (typeof seeked == "object") {
            //console.log(z, x)
            let lastOne: string = `${z}_${x}`
            if (this.tab[z + 1][x] == 0) {
                this.tab[z + 1][x] = 1;
                //console.table(positionTab)
                //console.log("men:", (this.positionTab[z + 1][x] as string[]), lastOne);
                (this.positionTab[z + 1][x] as string[]).push(lastOne);
                (this.positionTab[z + 1][x] as string[]).push(`${z + 1}_${x}`)
            }
            if (this.tab[z - 1][x] == 0) {
                this.tab[z - 1][x] = 1;
                (this.positionTab[z - 1][x] as string[]).push(lastOne);
                (this.positionTab[z - 1][x] as string[]).push(`${z - 1}_${x}`)
            }
            if (this.tab[z][x + 1] == 0) {
                this.tab[z][x + 1] = 1;
                (this.positionTab[z][x + 1] as string[]).push(lastOne);
                (this.positionTab[z][x + 1] as string[]).push(`${z}_${x + 1}`)
            }
            if (this.tab[z][x - 1] == 0) {
                this.tab[z][x - 1] = 1;
                (this.positionTab[z][x - 1] as string[]).push(lastOne);
                (this.positionTab[z][x - 1] as string[]).push(`${z}_${x - 1}`)
            }
            this.pathStart(1)
        }
        else if (typeof seeked == "number") {
            let brek: boolean = false
            for (let i: number = 2; i <= 10; i++) {
                for (let j: number = 2; j <= 10; j++) {
                    brek = false
                    //console.log("seeked ", seeked)
                    if (this.tab[i][j] == seeked) {
                        //console.log(j)
                        //let lastOne = [...(this.positionTab[i][j] as string[])]
                        //console.log("seeked", lastOne)
                        if (this.tab[i + 1][j] == 0) {
                            //console.log("bon1 ", seeked)
                            this.tab[i + 1][j] = seeked + 1;
                            if ((this.positionTab[i + 1][j] as string[]).length == 0) {
                                this.positionTab[i + 1][j] = [...(this.positionTab[i][j] as string[])];
                                (this.positionTab[i + 1][j] as string[]).push(`${i + 1}_${j}`)
                            }
                            brek = true
                        }
                        if (this.tab[i - 1][j] == 0) {
                            //console.log("bon2")
                            this.tab[i - 1][j] = seeked + 1
                            if ((this.positionTab[i - 1][j] as string[]).length == 0) {
                                this.positionTab[i - 1][j] = [...(this.positionTab[i][j] as string[])];
                                (this.positionTab[i - 1][j] as string[]).push(`${i - 1}_${j}`)
                            }
                            brek = true
                        }
                        if (this.tab[i][j + 1] == 0) {
                            //console.log("bon3")
                            this.tab[i][j + 1] = seeked + 1
                            if ((this.positionTab[i][j + 1] as string[]).length == 0) {
                                this.positionTab[i][j + 1] = [...(this.positionTab[i][j] as string[])];
                                (this.positionTab[i][j + 1] as string[]).push(`${i}_${j + 1}`)
                            }
                            brek = true
                        }
                        if (this.tab[i][j - 1] == 0) {
                            //console.log("bon4")
                            this.tab[i][j - 1] = seeked + 1
                            if ((this.positionTab[i][j - 1] as string[]).length == 0) {
                                this.positionTab[i][j - 1] = [...(this.positionTab[i][j] as string[])];
                                (this.positionTab[i][j - 1] as string[]).push(`${i}_${j - 1}`)
                            }
                            brek = true
                        }
                        //console.log(tab)
                        // if (i == ballMovingY && j == ballMovingX) {

                        // }
                    }
                }
            }
            //console.log(brek)

            if (!brek) {

                setTimeout(() => this.pathStart(seeked + 1), 1)
            }

        }
        //console.table(tab);
        //console.table(positionTab)
    }


}
/**
 * Decorator used for randomly changing position of the board after move
 *
 */
export function flip(target: any, name: string, descriptor: any) {


    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        var result = originalMethod.apply(this, args);
        console.log(`Wywołuję: ${name}`);
        console.log(result);
        document.body.style.transform = `rotate(${bulka}deg)`;
        return result;
    }
}
/**
 * Decorator used for shifting board between moves
 * 
 *
 */
// export function fliper(target: any, name: string, descriptor: any) {


//     var originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         var result = originalMethod.apply(this, args);
//         console.log(`Wywołuję: ${name}`);
//         console.log(result);
//         document.body.style.transform = `scale3d(-3, 3, 3)`;
//         return result;
//     }
// }




const game = new Game()


game.start()