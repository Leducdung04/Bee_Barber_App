export class Product {
    constructor(_id,categoryId,name,image,price,description,status){
        this._id = _id;
        this.categoryId = categoryId;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.status = status;
    }
}