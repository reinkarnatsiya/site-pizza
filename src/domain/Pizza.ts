export class Pizza {
    public id: string;
    public name: string;
    public price: number;
    public ingredients: string[];
    public imageUrl: string;

    constructor(id: string, name: string, price: number, ingredients: string[], imageUrl?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.imageUrl = imageUrl || '/default.png';
    }
}