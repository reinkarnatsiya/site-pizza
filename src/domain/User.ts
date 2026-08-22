export class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public role: 'гость' | 'админ' = 'гость';

    constructor(id: string, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    isAdmin(): boolean {
        return this.role === 'админ';
    }
}