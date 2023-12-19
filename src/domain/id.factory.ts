export abstract class IdFactory {
    abstract generateId(...params: string[]): string;
}