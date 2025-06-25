const express = require('express');
const router = express.Router();
const controller = require('../controllers/blog'); 

router.get('/blogs', controller.getBlogs);
router.post('/blogs', controller.postBlogs);
router.get('/Delete',controller.getDelete);
router.get('/Update',controller.getUpdate);
router.post('/update',controller.postUpdate);
router.get('/update/actor',controller.getUpdateActor);
router.post('/update/actor',controller.postUpdateActor);
router.get('/details',controller.getDetails);
router.get('/actors',controller.getActors);
router.post('/actors',controller.postActors);
router.get('/delete/actor',controller.getDeleteActor);

module.exports = router;
