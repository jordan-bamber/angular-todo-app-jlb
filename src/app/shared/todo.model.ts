export class todo {
    //TS shorthand for creating class, public keyword on properties is essential here
    constructor(
        public text: string,
        public completed: boolean = false

    ){}
    
}