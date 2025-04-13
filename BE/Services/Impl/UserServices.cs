using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ShopApi.Helper;
using ShopApi.Models;

namespace ShopApi.Services.Impl
{
    public class UserService : BaseService<User>, IUserService
    {
        public UserService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration) : base(context, cache, configuration)
        {
        }
        public async Task<int> CreateAsync(User entity)
        {
            entity.Password= Unity.Md5Hash(entity.Password);
            _context.Set<User>().Add(entity);
            var result = await _context.SaveChangesAsync();

            return result;
        }
        public Task<int> UpdateAsync(User entity)
        {
            var oldEntity = _context.Users.Where(c => c.UserId == entity.UserId).FirstOrDefault();
            entity.Password = oldEntity.Password;
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));
            _context.Entry(entity).State = EntityState.Modified;

            return _context.SaveChangesAsync();
        }
    }
}
