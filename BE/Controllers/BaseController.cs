using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using ShopApi.Services;

namespace ShopApi.Controllers
{
    public class BaseController<T> : ODataController where T : class
    {
        private IService<T> _service;
        public BaseController(IService<T> service)
        {
            _service = service;
        }
        [HttpGet]
        [EnableQuery(PageSize = 100)]
        public async Task<IActionResult> Get()
        {
            var query = await Task.FromResult(_service.GetAll());
            return Ok(query);
        }

        [HttpGet]
        [EnableQuery()]
        public async Task<IActionResult> Get([FromODataUri] int key)
        {
            var query = await _service.GetSingleAsync(key);
            return Ok(SingleResult.Create(query));
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T entity)
        {

            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            await _service.CreateAsync(entity);
            return Created(entity);
        }

        [HttpPut]
        public virtual async Task<IActionResult> Put([FromODataUri] int key, [FromBody] Delta<T> entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();

            entity.Put(original);
            await _service.UpdateAsync(original);
            return Updated(original);
        }

        [HttpPatch]
        public virtual async Task<IActionResult> Patch([FromODataUri] int key, [FromBody] Delta<T> entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();
            entity.Patch(original);
            await _service.UpdateAsync(original);
            return Updated(original);
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromODataUri] int key)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();
            await _service.DeleteAsync(original);
            return Ok();
        }
    }
}
