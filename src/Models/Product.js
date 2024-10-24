export class Product {
    constructor(_id,categoryId,name,imageUrl,price,description,status){
        this._id = _id;
        this.categoryId = categoryId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.status = status;
    }
}