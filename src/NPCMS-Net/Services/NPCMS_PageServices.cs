using NPCMS_Net.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NPCMS_Net.Services
{
    public class NPCMS_PageServices
    {
        private IGenericRepository _repo;

        //Injection of Generic Repository
        public NPCMS_PageServices(IGenericRepository repo) {
            this._repo = repo;
        }

        //Get All NPCMS Pages in the database
        public IEnumerable<NPCMS_Page> ListNPCMS_Pages() {

            return _repo.Query<NPCMS_Page>().ToList();
        }

        //Given one ID get data of the specific NPCMS_Page
        public NPCMS_Page GetNPCMS_Page(int id) {

            return _repo.Query<NPCMS_Page>().FirstOrDefault(np => np.Id == id);
        }

        /// <summary>
        /// 
        /// Create a new NPCMS_page into the Dabatase
        /// 
        /// </summary>
        public void CreateNPCMS_Page(NPCMS_Page npcms_page) {

            _repo.Add<NPCMS_Page>(npcms_page);

        }

        //Given an Object update a specific NPCMS_Page to the database
        public void UpdateNPCMS_Page(NPCMS_Page npcms_page) {

            _repo.Update<NPCMS_Page>(npcms_page);
        }

        //Given an Object remove a specific NPCMS_Page from the database
        public void DeleteNPCMS_Page(NPCMS_Page npcms_page) {

            _repo.Delete<NPCMS_Page>(npcms_page);
        }


        public List<string> DeletePageValidation(NPCMS_Page npcms_page)
        {

            List<string> messageError = new List<string>();

            var errorText = "";

            errorText = RequiredDeletePageValidation(npcms_page);

            if (errorText != null)
            {

                messageError.Add(errorText);
                errorText = null;
            }

            return messageError;
        }


        public List<string> PageValidation(NPCMS_Page npcms_page) {

            List<string> messageError = new List<string>();

            var errorText = "";
            
           errorText = RequiredUpdatePageValidation(npcms_page);

            if (errorText != null) {

                messageError.Add(errorText);
                errorText = null; 
            }

            errorText = PagePathValidation(npcms_page);

            if (errorText != null)
            {

                messageError.Add(errorText);
                errorText = null;
            }

            return messageError;
        }

       /* private string PageTitleValidation(NPCMS_Page npcms_page) {

            var titleCount = _repo.Query<NPCMS_Page>().Where(np => np.Title == npcms_page.Title && np.Id != npcms_page.Id).Count();

            if (titleCount > 0)
            {
                return "The Title of Page already in use"; 

            }

            return null;
                
        }*/

        private string PagePathValidation(NPCMS_Page npcms_page)
        {

            var pathCount = _repo.Query<NPCMS_Page>().Where(np => np.Path == npcms_page.Path && np.Id != npcms_page.Id).Count();

            if (pathCount > 0)
            {
                return "The Path of the Page already in use.";

            }

            return null;

        }

        private string RequiredUpdatePageValidation(NPCMS_Page npcms_page)
        {

            var requiredCount = _repo.Query<NPCMS_Page>().Where(np => (np.Title == "Home" || np.Title == "Error" || np.Title == "NotFound") &&
                                                                np.Id == npcms_page.Id && np.Path != npcms_page.Path).Count();

            if (requiredCount > 0)
            {
                return "Required Page the Path can not be changed";
            }

            return null;
        }

        private string RequiredDeletePageValidation(NPCMS_Page npcms_page) {

            var requiredCount = _repo.Query<NPCMS_Page>().Where(np => (np.Title == "Home" || np.Title == "Error" || np.Title == "NotFound") && 
                                                                np.Id == npcms_page.Id).Count();

            if (requiredCount > 0) {
                return "Required Page can not be deleted";
            }

            return null;
        }

    }
}
