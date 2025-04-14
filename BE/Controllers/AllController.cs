using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApi.Helper;
using ShopApi.Models;
using ShopApi.Services;

namespace ShopApi.Controllers
{
    public class AddressesController : BaseController<Address>
    {
        public AddressesController(IAddressService service) : base(service) { }
    }

    public class CategoriesController : BaseController<Category>
    {
        public CategoriesController(ICategoryService service) : base(service) { }
    }

    public class CartsController : BaseController<Cart>
    {
        public CartsController(ICartService service) : base(service) { }
    }

    public class CartItemsController : BaseController<Cartitem>
    {
        public CartItemsController(ICartItemService service) : base(service) { }
    }

    public class ItemsController : BaseController<Item>
    {
        public ItemsController(IItemService service) : base(service) { }
    }

    public class ItemDetailsController : BaseController<Itemdetail>
    {
        public ItemDetailsController(IItemDetailService service) : base(service) { }
    }

    public class ItemImagesController : BaseController<Itemimage>
    {
        public ItemImagesController(IItemImageService service) : base(service) { }
    }

    public class OrdersesController : BaseController<Order>
    {
        public OrdersesController(IOrderService service) : base(service) { }
    }

    public class OrderDetailsController : BaseController<Orderdetail>
    {
        public OrderDetailsController(IOrderDetailService service) : base(service) { }
    }

    public class PaymentsController : BaseController<Payment>
    {
        public PaymentsController(IPaymentService service) : base(service) { }
    }

    public class UserRolesController : BaseController<UserRole>
    {
        public UserRolesController(IUserRoleService service) : base(service) { }
    }

    public class RolesController : BaseController<Role>
    {
        public RolesController(IRoleService service) : base(service) { }
    }

    public class UsersController : BaseController<User>
    {
        public UsersController(IUserService service) : base(service) { }
    }
    public class ReviewsController : BaseController<Review>
    {
        public ReviewsController(IReviewService service) : base(service) { }
    }
    public class CustomController : Controller
    {
        private IAuthenticationService authenticationService;

        public CustomController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Authentication/Login")]
        public ActionResult Login([FromBody] UserLogin userLogin)
        {
            return Ok(authenticationService.Login(userLogin.Email, userLogin.Password));
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("Authentication/ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPassword model)
        {
            var user = authenticationService.GetUserByEmail(model.Email);
            if (user == null)
                return NotFound("Email không tồn tại.");

            var newPassword = Unity.GenerateRandomPassword(8);
            var hashPassword = Unity.Md5Hash(newPassword);

            // 2. Gán mật khẩu mới đã hash
            user.Password = hashPassword;
            await authenticationService.UpdatePasswordAsync(user); 

            // 3. Gửi email
            await Unity.SendEmailAsync(user.Email, "Mật khẩu mới của bạn",
                $"Mật khẩu mới là: <b>{newPassword}</b>. Vui lòng đổi lại sau khi đăng nhập.");

            return Ok("Mật khẩu mới đã được gửi qua email.");
        }

    }
}
