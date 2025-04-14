using ShopApi.Models;

namespace ShopApi.Services
{
   
    public interface IAddressService : IService<Address> { }
    public interface ICartService : IService<Cart> { }
    public interface ICartItemService : IService<Cartitem> { }
    public interface ICategoryService : IService<Category> { }
    public interface IItemService : IService<Item> { }
    public interface IItemDetailService : IService<Itemdetail> { }
    public interface IItemImageService : IService<Itemimage> { }
    public interface IOrderService : IService<Order> { }
    public interface IOrderDetailService : IService<Orderdetail> { }
    public interface IPaymentService : IService<Payment> { }

    public interface IRoleService : IService<Role> { }
    public interface IUserRoleService : IService<UserRole> { }

    public interface IReviewService : IService<Review> { }

}
