import {Router}from 'express'

import auth from '../middleware/auth.js';
import { AddSubCategoryController, getSubCategory } from '../controllers/subCategory.controller.js';

const SubCategoryRouter=Router();
SubCategoryRouter.post('/create',auth,AddSubCategoryController)
SubCategoryRouter.get('/get',getSubCategory)
export default SubCategoryRouter;