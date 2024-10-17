using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerProfilesController : ControllerBase
    {
        private readonly CustomerContext _context;

        public CustomerProfilesController(CustomerContext context)
        {
            _context = context;
        }

        // GET: api/CustomerProfiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerProfile>>> GetCustomerProfiles()
        {
            return await _context.CustomerProfiles.ToListAsync();
        }

        // GET: api/CustomerProfiles/?
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerProfile>> GetCustomerProfile(int id)
        {
            var customerProfile = await _context.CustomerProfiles.FindAsync(id);

            if (customerProfile == null)
            {
                return NotFound();
            }

            return customerProfile;
        }

        // POST: api/CustomerProfiles
        [HttpPost]
        public async Task<ActionResult<CustomerProfile>> PostCustomerProfile(CustomerProfile customerProfile)
        {
            _context.CustomerProfiles.Add(customerProfile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomerProfile), new { id = customerProfile.CustomerID }, customerProfile);
        }

        // PUT: api/CustomerProfiles/?
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerProfile(int id, CustomerProfile customerProfile)
        {
            if (id != customerProfile.CustomerID)
            {
                return BadRequest();
            }

            _context.Entry(customerProfile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerProfileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/CustomerProfiles/?
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerProfile(int id)
        {
            var customerProfile = await _context.CustomerProfiles.FindAsync(id);
            if (customerProfile == null)
            {
                return NotFound();
            }

            _context.CustomerProfiles.Remove(customerProfile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerProfileExists(int id)
        {
            return _context.CustomerProfiles.Any(e => e.CustomerID == id);
        }
    }
}
