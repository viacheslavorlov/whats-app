import Dexie, {Table} from 'dexie';


export class MySubClassedDexie extends Dexie {
    // We just tell the typing system this is the case
    notifications!: Table<any>;

    constructor() {
        super('whatsapp');
        this.version(1).stores({
            notifications: '&receiptId, body' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();