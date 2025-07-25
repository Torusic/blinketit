import { Router } from "express";
import { AddCategoryConroller, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";
import auth from "../middleware/auth.js";

const categoryRouter=Router()

categoryRouter.post('/add-category',auth,AddCategoryConroller);
categoryRouter.get('/get',getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete('/delete',auth,deleteCategoryController)
export default categoryRouter;