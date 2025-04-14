using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShopApi.Helper;
using ShopApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopApi.Services.Impl
{
    public class AuthenticationService : IAuthenticationService
    {
        private ShopSellerContext _context;

        public AuthenticationService(ShopSellerContext context)
        {
            _context = context;
        }

        public object Login(string username, string password)
        {
            var user = GetUser(username, password);
            if (user == null)
            {
                return null;
            }
            List<object> roles = null;
            return new
            {
                token = GenerateToken(user),
                fullname = user.FullName,
                userid = user.UserId,
                email = user.Email,
                status = user.Status,
                roles = user.UserRoles!=null ? user.UserRoles.Select(c => new { c.Role.Id, c.Role.Name }).ToList() : null,
                //depart = user.Depart!=null ? new { name = user.Depart.Name, description = user.Depart.Description, id = user.Depart.Id } : null,
                //rights = user.UserRights!=null ? user.UserRights.Select(c => new { c.Right.Id, c.Right.Name, c.Right.Description }).ToList() : null
            };
        }
        private string GenerateToken(User user)
        {
            var config = ConfigurationHelper.config;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt.Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            //var roles = user.UserRoles.Select(c => c.Role).ToList();
            string strRole = "";
            foreach (var role in user.UserRoles.Select(c => c.Role).ToList())
            {
                strRole += strRole == "" ? role.Name : "," + role.Name;
            }
            var claims = new[]
            {
                new Claim("Id",user.UserId.ToString()),

                new Claim("Role",strRole)
            };

            var tokenExpries = 30;

            var token = new JwtSecurityToken(config["Jwt.Issuer"],
                config["Jwt.Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(tokenExpries),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        private User GetUser(string username, string password)
        {
            var hashPassword = Unity.Md5Hash(password);
            return _context.Users.Where(c => c.Email.ToLower()==username.ToLower()).Where(c => c.Password==hashPassword).Include(c => c.UserRoles).ThenInclude(c => c.Role)

                .FirstOrDefault();
        }
        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
        }

        public async Task UpdatePasswordAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

    }
}
