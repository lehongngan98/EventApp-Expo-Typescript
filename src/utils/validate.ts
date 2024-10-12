export class Validate {
    static email(mail: string) {
        if (/^[\w.-]+@gmail\.com$/.test(mail)) {
            return true;
        }
        return false;
    }

    static Password = (val: string) => {
        return val.length >= 6;
    };
}
