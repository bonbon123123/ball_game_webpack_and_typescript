



/**
 * Class used for blocking player from doing anythink
 * @param target the element we want to block
 * 
 */
export default class SoftBlock {
    target: HTMLElement
    square: HTMLDivElement = document.createElement('div');
    constructor(target: HTMLElement) {

        this.target = target
    }



    /**
    * Metod used for blocking player from doing anythink
    * @param div the element we block with */
    //@blackout
    block(div: HTMLDivElement) {
        this.square = div
        this.square.style.width = "450px";
        this.square.style.height = '450px';
        //this.square.style.backgroundColor = `black`
        this.square.style.position = "absolute"
        this.square.style.zIndex = "100"
        //this.square.style.opacity = "0"
        this.target.appendChild(this.square)
    }

    /**
     * unblocking the player via destroing div from block
     * 
     *
     */
    unblock() {
        this.square.remove()
    }


}


/**
 * decorator used to remove from player ability to see board after his move
 *
 *
 */
// export function blackout(target: any, name: string, descriptor: any) {
//     var originalMethod = descriptor.value;
//     descriptor.value = function (...args: any[]) {
//         args[0].style.backgroundColor = "black"
//         var result = originalMethod.apply(this, args);
//         console.log(`Wywołuję: ${name}`);
//         console.log(result);

//         return result;
//     }
// }



