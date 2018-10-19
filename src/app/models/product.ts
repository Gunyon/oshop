export class Product {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  key: string;
  constructor(obj?: any) {
    this.title = obj && obj.title || null;
    this.price = obj && obj.price || null;
    this.category = obj && obj.category || null;
    this.imageUrl = obj && obj.imageUrl || null;
    this.key = obj && obj.key || null;
  }
}
