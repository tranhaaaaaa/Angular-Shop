type TCategory = Category;
type TAddress = Address;
type TCart = Cart;
type TCartitem = Cartitem;
type TItem = Item;
type TItemdetail = Itemdetail;
type TItemimage = Itemimage;
type TOrder = Order;
type TOrderdetail = Orderdetail;
type TPayment = Payment;
type TUser = User;
type TUserRole = UserRole;
type TRole = Role;
type TReview = Review;
import { JsonObject, JsonProperty, JsonConverter, JsonConvert, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class NumberConverter implements JsonCustomConvert<number> {
    serialize(data: any): number {
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
    deserialize(data: any): number {
        if (typeof data === 'undefined' || data === null) {
            return data;
        }
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
}
@JsonConverter
export class StringConverter implements JsonCustomConvert<string> {
    serialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
    deserialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
}
@JsonConverter
export class BooleanConverter implements JsonCustomConvert<boolean> {
    serialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
    deserialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
}
@JsonConverter
export class DateTimeConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        function pad(number: any) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }
    deserialize(date: any): Date {
        const dReturn = new Date(date);
        if (dReturn.getFullYear() === 1970
            && dReturn.getMonth() === 0
            && dReturn.getDate() === 1) {
            return null as any;
        } else {
            return dReturn;
        }
    }
}
@JsonConverter
export class ItemArrayConverter implements JsonCustomConvert<Item[]> {
    serialize(data: Item[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Item[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Item);
    }
}
@JsonConverter
export class UserConverter implements JsonCustomConvert<User> {
    serialize(data: User): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): User {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, User);
    }
}
@JsonConverter
export class OrderArrayConverter implements JsonCustomConvert<Order[]> {
    serialize(data: Order[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Order[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Order);
    }
}
@JsonConverter
export class CartitemArrayConverter implements JsonCustomConvert<Cartitem[]> {
    serialize(data: Cartitem[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Cartitem[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Cartitem);
    }
}
@JsonConverter
export class CartConverter implements JsonCustomConvert<Cart> {
    serialize(data: Cart): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Cart {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Cart);
    }
}
@JsonConverter
export class ItemConverter implements JsonCustomConvert<Item> {
    serialize(data: Item): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Item {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Item);
    }
}
@JsonConverter
export class ItemdetailConverter implements JsonCustomConvert<Itemdetail> {
    serialize(data: Itemdetail): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Itemdetail {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Itemdetail);
    }
}
@JsonConverter
export class CategoryConverter implements JsonCustomConvert<Category> {
    serialize(data: Category): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Category {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Category);
    }
}
@JsonConverter
export class ItemdetailArrayConverter implements JsonCustomConvert<Itemdetail[]> {
    serialize(data: Itemdetail[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Itemdetail[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Itemdetail);
    }
}
@JsonConverter
export class ItemimageArrayConverter implements JsonCustomConvert<Itemimage[]> {
    serialize(data: Itemimage[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Itemimage[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Itemimage);
    }
}
@JsonConverter
export class ReviewArrayConverter implements JsonCustomConvert<Review[]> {
    serialize(data: Review[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Review[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Review);
    }
}
@JsonConverter
export class OrderdetailArrayConverter implements JsonCustomConvert<Orderdetail[]> {
    serialize(data: Orderdetail[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Orderdetail[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Orderdetail);
    }
}
@JsonConverter
export class AddressConverter implements JsonCustomConvert<Address> {
    serialize(data: Address): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Address {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Address);
    }
}
@JsonConverter
export class PaymentArrayConverter implements JsonCustomConvert<Payment[]> {
    serialize(data: Payment[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Payment[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Payment);
    }
}
@JsonConverter
export class OrderConverter implements JsonCustomConvert<Order> {
    serialize(data: Order): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Order {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Order);
    }
}
@JsonConverter
export class AddressArrayConverter implements JsonCustomConvert<Address[]> {
    serialize(data: Address[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Address[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Address);
    }
}
@JsonConverter
export class CartArrayConverter implements JsonCustomConvert<Cart[]> {
    serialize(data: Cart[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Cart[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Cart);
    }
}
@JsonConverter
export class UserRoleArrayConverter implements JsonCustomConvert<UserRole[]> {
    serialize(data: UserRole[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): UserRole[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, UserRole);
    }
}
@JsonConverter
export class RoleConverter implements JsonCustomConvert<Role> {
    serialize(data: Role): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Role {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Role);
    }
}

@JsonObject('Category')
export class Category {

    @JsonProperty('CategoryId', NumberConverter, true)
    CategoryId: number = undefined as any;

    @JsonProperty('CategoryName', StringConverter, true)
    CategoryName: string = undefined as any;

    @JsonProperty('CategoryDescription', StringConverter, true)
    CategoryDescription: string = undefined as any;

    @JsonProperty('Items', ItemArrayConverter, true)
    Items: Item[] = [] as any;

}

@JsonObject('Address')
export class Address {

    @JsonProperty('AddressId', NumberConverter, true)
    AddressId: number = undefined as any;

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('Province', StringConverter, true)
    Province: string = undefined as any;

    @JsonProperty('Town', StringConverter, true)
    Town: string = undefined as any;

    @JsonProperty('District', StringConverter, true)
    District: string = undefined as any;

    @JsonProperty('SpecificAdd', StringConverter, true)
    SpecificAdd: string = undefined as any;

    @JsonProperty('User', UserConverter, true)
    User: User = undefined as any;

    @JsonProperty('Orders', OrderArrayConverter, true)
    Orders: Order[] = [] as any;

}

@JsonObject('Cart')
export class Cart {

    @JsonProperty('CartId', NumberConverter, true)
    CartId: number = undefined as any;

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('User', UserConverter, true)
    User: User = undefined as any;

    @JsonProperty('Cartitems', CartitemArrayConverter, true)
    Cartitems: Cartitem[] = [] as any;

}

@JsonObject('Cartitem')
export class Cartitem {

    @JsonProperty('CartItemId', NumberConverter, true)
    CartItemId: number = undefined as any;

    @JsonProperty('CartId', NumberConverter, true)
    CartId: number = undefined as any;

    @JsonProperty('ItemId', NumberConverter, true)
    ItemId: number = undefined as any;

    @JsonProperty('Quantity', NumberConverter, true)
    Quantity: number = undefined as any;

    @JsonProperty('ItemDetailId', NumberConverter, true)
    ItemDetailId: number = undefined as any;

    @JsonProperty('Cart', CartConverter, true)
    Cart: Cart = undefined as any;

    @JsonProperty('Item', ItemConverter, true)
    Item: Item = undefined as any;

    @JsonProperty('ItemDetail', ItemdetailConverter, true)
    ItemDetail: Itemdetail = undefined as any;

}

@JsonObject('Item')
export class Item {

    @JsonProperty('ItemId', NumberConverter, true)
    ItemId: number = undefined as any;

    @JsonProperty('ItemName', StringConverter, true)
    ItemName: string = undefined as any;

    @JsonProperty('ItemDescription', StringConverter, true)
    ItemDescription: string = undefined as any;

    @JsonProperty('Discount', NumberConverter, true)
    Discount: number = undefined as any;

    @JsonProperty('IsAvailable', BooleanConverter, true)
    IsAvailable: boolean = undefined as any;

    @JsonProperty('CategoryId', NumberConverter, true)
    CategoryId: number = undefined as any;

    @JsonProperty('CreatedBy', NumberConverter, true)
    CreatedBy: number = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('Category', CategoryConverter, true)
    Category: Category = undefined as any;

    @JsonProperty('CreatedByNavigation', UserConverter, true)
    CreatedByNavigation: User = undefined as any;

    @JsonProperty('Cartitems', CartitemArrayConverter, true)
    Cartitems: Cartitem[] = [] as any;

    @JsonProperty('Itemdetails', ItemdetailArrayConverter, true)
    Itemdetails: Itemdetail[] = [] as any;

    @JsonProperty('Itemimages', ItemimageArrayConverter, true)
    Itemimages: Itemimage[] = [] as any;

    @JsonProperty('Reviews', ReviewArrayConverter, true)
    Reviews: Review[] = [] as any;

}

@JsonObject('Itemdetail')
export class Itemdetail {

    @JsonProperty('ItemDetailId', NumberConverter, true)
    ItemDetailId: number = undefined as any;

    @JsonProperty('Color', StringConverter, true)
    Color: string = undefined as any;

    @JsonProperty('Size', StringConverter, true)
    Size: string = undefined as any;

    @JsonProperty('Quantity', NumberConverter, true)
    Quantity: number = undefined as any;

    @JsonProperty('ItemId', NumberConverter, true)
    ItemId: number = undefined as any;

    @JsonProperty('ItemPrice', NumberConverter, true)
    ItemPrice: number = undefined as any;

    @JsonProperty('Item', ItemConverter, true)
    Item: Item = undefined as any;

    @JsonProperty('Cartitems', CartitemArrayConverter, true)
    Cartitems: Cartitem[] = [] as any;

    @JsonProperty('Orderdetails', OrderdetailArrayConverter, true)
    Orderdetails: Orderdetail[] = [] as any;

}

@JsonObject('Itemimage')
export class Itemimage {

    @JsonProperty('ItemImageId', NumberConverter, true)
    ItemImageId: number = undefined as any;

    @JsonProperty('ItemImageUrl', StringConverter, true)
    ItemImageUrl: string = undefined as any;

    @JsonProperty('ItemId', NumberConverter, true)
    ItemId: number = undefined as any;

    @JsonProperty('Item', ItemConverter, true)
    Item: Item = undefined as any;

}

@JsonObject('Order')
export class Order {

    @JsonProperty('OrderId', NumberConverter, true)
    OrderId: number = undefined as any;

    @JsonProperty('OrderDate', DateTimeConverter, true)
    OrderDate: Date = undefined as any;

    @JsonProperty('TotalPrice', NumberConverter, true)
    TotalPrice: number = undefined as any;

    @JsonProperty('Status', StringConverter, true)
    Status: string = undefined as any;

    @JsonProperty('Note', StringConverter, true)
    Note: string = undefined as any;

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('OverDueDate', DateTimeConverter, true)
    OverDueDate: Date = undefined as any;

    @JsonProperty('AddressId', NumberConverter, true)
    AddressId: number = undefined as any;

    @JsonProperty('Address', AddressConverter, true)
    Address: Address = undefined as any;

    @JsonProperty('User', UserConverter, true)
    User: User = undefined as any;

    @JsonProperty('Orderdetails', OrderdetailArrayConverter, true)
    Orderdetails: Orderdetail[] = [] as any;

    @JsonProperty('Payments', PaymentArrayConverter, true)
    Payments: Payment[] = [] as any;

}

@JsonObject('Orderdetail')
export class Orderdetail {

    @JsonProperty('OrderDetailId', NumberConverter, true)
    OrderDetailId: number = undefined as any;

    @JsonProperty('Quantity', NumberConverter, true)
    Quantity: number = undefined as any;

    @JsonProperty('Discount', NumberConverter, true)
    Discount: number = undefined as any;

    @JsonProperty('OrderId', NumberConverter, true)
    OrderId: number = undefined as any;

    @JsonProperty('ItemDetailId', NumberConverter, true)
    ItemDetailId: number = undefined as any;

    @JsonProperty('ItemDetail', ItemdetailConverter, true)
    ItemDetail: Itemdetail = undefined as any;

    @JsonProperty('Order', OrderConverter, true)
    Order: Order = undefined as any;

}

@JsonObject('Payment')
export class Payment {

    @JsonProperty('PaymentCode', NumberConverter, true)
    PaymentCode: number = undefined as any;

    @JsonProperty('OrderId', NumberConverter, true)
    OrderId: number = undefined as any;

    @JsonProperty('PaymentMethod', StringConverter, true)
    PaymentMethod: string = undefined as any;

    @JsonProperty('PaymentStatus', StringConverter, true)
    PaymentStatus: string = undefined as any;

    @JsonProperty('Order', OrderConverter, true)
    Order: Order = undefined as any;

}

@JsonObject('User')
export class User {

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('FullName', StringConverter, true)
    FullName: string = undefined as any;

    @JsonProperty('Email', StringConverter, true)
    Email: string = undefined as any;

    @JsonProperty('Password', StringConverter, true)
    Password: string = undefined as any;

    @JsonProperty('PhoneNumber', NumberConverter, true)
    PhoneNumber: number = undefined as any;

    @JsonProperty('LastLogin', DateTimeConverter, true)
    LastLogin: Date = undefined as any;

    @JsonProperty('Status', NumberConverter, true)
    Status: number = undefined as any;

    @JsonProperty('Role', NumberConverter, true)
    Role: number = undefined as any;

    @JsonProperty('Addresses', AddressArrayConverter, true)
    Addresses: Address[] = [] as any;

    @JsonProperty('Carts', CartArrayConverter, true)
    Carts: Cart[] = [] as any;

    @JsonProperty('Items', ItemArrayConverter, true)
    Items: Item[] = [] as any;

    @JsonProperty('Orders', OrderArrayConverter, true)
    Orders: Order[] = [] as any;

    @JsonProperty('Reviews', ReviewArrayConverter, true)
    Reviews: Review[] = [] as any;

    @JsonProperty('UserRoles', UserRoleArrayConverter, true)
    UserRoles: UserRole[] = [] as any;

}

@JsonObject('UserRole')
export class UserRole {

    @JsonProperty('Id', NumberConverter, true)
    Id: number = undefined as any;

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('RoleId', NumberConverter, true)
    RoleId: number = undefined as any;

    @JsonProperty('Role', RoleConverter, true)
    Role: Role = undefined as any;

    @JsonProperty('User', UserConverter, true)
    User: User = undefined as any;

}

@JsonObject('Role')
export class Role {

    @JsonProperty('Id', NumberConverter, true)
    Id: number = undefined as any;

    @JsonProperty('Name', StringConverter, true)
    Name: string = undefined as any;

    @JsonProperty('UserRoles', UserRoleArrayConverter, true)
    UserRoles: UserRole[] = [] as any;

}

@JsonObject('Review')
export class Review {

    @JsonProperty('ReviewId', NumberConverter, true)
    ReviewId: number = undefined as any;

    @JsonProperty('ItemId', NumberConverter, true)
    ItemId: number = undefined as any;

    @JsonProperty('UserId', NumberConverter, true)
    UserId: number = undefined as any;

    @JsonProperty('Rating', NumberConverter, true)
    Rating: number = undefined as any;

    @JsonProperty('Comment', StringConverter, true)
    Comment: string = undefined as any;

    @JsonProperty('CreatedAt', DateTimeConverter, true)
    CreatedAt: Date = undefined as any;

    @JsonProperty('Item', ItemConverter, true)
    Item: Item = undefined as any;

    @JsonProperty('User', UserConverter, true)
    User: User = undefined as any;

}
