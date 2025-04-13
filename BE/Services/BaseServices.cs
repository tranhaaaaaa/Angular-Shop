using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ShopApi.Models;

namespace ShopApi.Services
{
    public class BaseService<T> : IService<T> where T : class
    {
        public IMemoryCache _cache;
        public IConfiguration configuration;
        public readonly ShopSellerContext _context;
        public BaseService(ShopSellerContext context, IMemoryCache cache, IConfiguration configuration)
        {
            _context = context;
            _cache = cache;
            this.configuration= configuration;
        }

        public virtual async Task<int> CreateAsync(T entity)
        {
            try
            {
                _context.Set<T>().Add(entity);
                var result = await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public virtual Task<int> DeleteAsync(T entity)
        {
            try
            {
                _context.Set<T>().Remove(entity);
                var result = _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }

        public virtual IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public virtual ValueTask<T> GetObjectAsync(int id)
        {
            return _context.Set<T>().FindAsync(id);
            // throw new NotImplementedException();
        }

        public virtual Task<IQueryable<T>> GetSingleAsync(int id)
        {
            throw new NotImplementedException();
        }
        public virtual Task<int> UpdateAsync(T entity)
        {
            try
            {
                if (entity == null)
                    throw new ArgumentNullException(nameof(entity));
                _context.Entry(entity).State = EntityState.Modified;
                var result = _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


    }
}
