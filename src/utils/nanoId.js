import { customAlphabet } from 'nanoid';
export default function createNanoID() {
    const nanoId = customAlphabet(
        '1234567890abcdefghijklmnoqprstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        15
    );
    return nanoId();
}
