using ShopApi.Models;

namespace ShopApi.Services
{
    public interface IAuthenticationService
    {
        public object Login(string username, string password);
        User GetUserByEmail(string email);
        Task UpdatePasswordAsync(User user);

    }
}
