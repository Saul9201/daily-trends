export class Feed {
    constructor(
        readonly id: string,
        readonly title: string, 
        readonly source: string, 
        readonly date: Date,
        readonly url: string,
        readonly content?: string, 
        readonly thumbnail?: string,
    ) {}
}