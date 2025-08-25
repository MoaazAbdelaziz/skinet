using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductsController(IGenericRepository<Product> repository) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        repository.Add(product);

        if (await repository.SaveAllAsync())
        {
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        return BadRequest("Problem creating product");
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
    {
        var spec = new ProductSpecification(specParams);

        return await CreatePagedResult(repository, spec, specParams.PageIndex, specParams.PageSize);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product?>> GetProduct(int id)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            return NotFound("Product not found");
        }

        return product;
    }

    [HttpGet("brands")]
    public async Task<ActionResult<IEnumerable<string>>> GetBrands()
    {
        var spec = new BrandListSpecification();

        return Ok(await repository.ListAsync(spec));
    }

    [HttpGet("types")]
    public async Task<ActionResult<IEnumerable<string>>> GetTypes()
    {
        var spec = new TypeListSpecification();

        return Ok(await repository.ListAsync(spec));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {
        if (id != product.Id || !ProductExists(id))
        {
            return BadRequest("Cannot update this product");
        }

        repository.Update(product);

        if (await repository.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem updating the product");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await repository.GetByIdAsync(id);

        if (product == null)
        {
            return NotFound("Product not found");
        }

        repository.Delete(product);

        if (await repository.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem deleting the product");
    }

    private bool ProductExists(int id)
    {
        return repository.Exists(id);
    }
}
