using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NPCMS_Net.Services;
using NPCMS_Net.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace NPCMS_Net.API
{
    [Route("api/[controller]")]
    public class NPCMS_PagesController : Controller
    {
        private NPCMS_PageServices _npcms_pageservices;

        public NPCMS_PagesController(NPCMS_PageServices npcms_pageservices) {

            this._npcms_pageservices = npcms_pageservices;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<NPCMS_Page> Get()
        {
            return _npcms_pageservices.ListNPCMS_Pages();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public NPCMS_Page Get(int id)
        {
            return _npcms_pageservices.GetNPCMS_Page(id);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]NPCMS_Page npcms_page)
        {
            if (ModelState.IsValid) {


                var MessageErrors = _npcms_pageservices.PageValidation(npcms_page);

                foreach (var item in MessageErrors)
                {
                    ModelState.AddModelError("", item);

                } 

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);

                }

                if (npcms_page.Id == 0)
                {
                    _npcms_pageservices.CreateNPCMS_Page(npcms_page);
                }else
                {
                    _npcms_pageservices.UpdateNPCMS_Page(npcms_page);
                }
                return Ok(npcms_page);
            }

            return BadRequest(ModelState);
            

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var npcmspage = _npcms_pageservices.GetNPCMS_Page(id);

            if (npcmspage == null)
            {

                return NotFound();

            }

            var MessageErrors = _npcms_pageservices.DeletePageValidation(npcmspage);

            foreach (var item in MessageErrors)
            {
                ModelState.AddModelError("", item);

            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            
            _npcms_pageservices.DeleteNPCMS_Page(npcmspage);

            return Ok();

        }
    }
}
