namespace ShopApi.Services
{
    public interface IService<T> : IDisposable, IAsyncDisposable where T : class
    {
        IQueryable<T> GetAll();

        ValueTask<T> GetObjectAsync(int id);

        Task<int> CreateAsync(T entity);

        Task<int> UpdateAsync(T entity);

        Task<int> DeleteAsync(T entity);

        Task<IQueryable<T>> GetSingleAsync(int id);
    }
}
