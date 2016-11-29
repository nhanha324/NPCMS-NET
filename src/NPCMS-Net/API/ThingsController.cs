using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPCMS_Net.Data;
using NPCMS_Net.Models;

namespace NPCMS_Net.API
{
    [Produces("application/json")]
    [Route("api/Things")]
    public class ThingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ThingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Things
        [HttpGet]
        public IEnumerable<Thing> GetThings()
        {
            return _context.Things;
        }

        // GET: api/Things/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetThing([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing thing = await _context.Things.SingleOrDefaultAsync(m => m.ThingId == id);

            if (thing == null)
            {
                return NotFound();
            }

            return Ok(thing);
        }

        // PUT: api/Things/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThing([FromRoute] int id, [FromBody] Thing thing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != thing.ThingId)
            {
                return BadRequest();
            }

            _context.Entry(thing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThingExists(id))
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

        // POST: api/Things
        [HttpPost]
        public async Task<IActionResult> PostThing([FromBody] Thing thing)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (ThingExists(thing.ThingId))
            {
                _context.Entry(thing).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ThingExists(thing.ThingId))
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
            else {

                _context.Things.Add(thing);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (ThingExists(thing.ThingId))
                    {
                        return new StatusCodeResult(StatusCodes.Status409Conflict);
                    }
                    else
                    {
                        throw;
                    }
                }

                return CreatedAtAction("GetThing", new { id = thing.ThingId }, thing);

            }

           
        }

        // DELETE: api/Things/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteThing([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing thing = await _context.Things.SingleOrDefaultAsync(m => m.ThingId == id);
            if (thing == null)
            {
                return NotFound();
            }

            _context.Things.Remove(thing);
            await _context.SaveChangesAsync();

            return Ok(thing);
        }

        private bool ThingExists(int id)
        {
            return _context.Things.Any(e => e.ThingId == id);
        }
    }
}