import { nanoid } from 'nanoid';
export default function createNanoID() {
    const nanoId = nanoid(12);
    return nanoId;
}
