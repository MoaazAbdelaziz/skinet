using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IGenericRepository<Product> repository) : ControllerBase
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
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(string? brand, string? type, string? sort)
    {
        var spec = new ProductSpecification(brand, type, sort);

        var products = await repository.ListAsync(spec);

        return Ok(products);
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

    // [HttpGet("brands")]
    // public async Task<ActionResult<IEnumerable<string>>> GetBrands()
    // {
    //     return Ok(await productRepository.GetBrandsAsync());
    // }

    // [HttpGet("types")]
    // public async Task<ActionResult<IEnumerable<string>>> GetTypes()
    // {
    //     return Ok(await productRepository.GetTypesAsync());
    // }

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
