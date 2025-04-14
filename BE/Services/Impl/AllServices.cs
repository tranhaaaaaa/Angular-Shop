using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using ShopApi.Models;

namespace ShopApi.Services.Impl
{
    public class AddressService : BaseService<Address>, IAddressService
    {
        public AddressService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class CartService : BaseService<Cart>, ICartService
    {
        public CartService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class CartItemService : BaseService<Cartitem>, ICartItemService
    {
        public CartItemService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class CategoryService : BaseService<Category>, ICategoryService
    {
        public CategoryService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class ItemService : BaseService<Item>, IItemService
    {
        public ItemService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class ItemDetailService : BaseService<Itemdetail>, IItemDetailService
    {
        public ItemDetailService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class ItemImageService : BaseService<Itemimage>, IItemImageService
    {
        public ItemImageService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class OrderService : BaseService<Order>, IOrderService
    {
        public OrderService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class OrderDetailService : BaseService<Orderdetail>, IOrderDetailService
    {
        public OrderDetailService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

    public class PaymentService : BaseService<Payment>, IPaymentService
    {
        public PaymentService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }
    public class RoleService : BaseService<Role>, IRoleService
    {
        public RoleService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }
    public class UserRoleService : BaseService<UserRole>, IUserRoleService
    {
        public UserRoleService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }
    public class ReviewService : BaseService<Review>, IReviewService
    {
        public ReviewService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
            : base(context, cache, configuration) { }
    }

}
