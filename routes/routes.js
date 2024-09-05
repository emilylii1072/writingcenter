import express from 'express';
import * as ctrl from '../controllers/mainController.js';
import * as auth from '../controllers/authController.js';

const router = express.Router();

router.get('/login', auth.login);
router.post('/login', auth.verifyLogin);
router.get('/register', auth.register);
router.post('/register', auth.verifyRegister);
router.get('/logout', auth.logout);

// Home Page Route
router.get('/', ctrl.renderIndex);

// Advice Page Route
router.get('/advice', ctrl.renderAdvice);

// Resources Page Routes
router.get('/resources/:type', ctrl.renderResourceGroup);
router.get('/resources/:type/new', auth.isFellow, ctrl.renderNewResourceForm);
router.post('/resources/:type/new', auth.isFellow, ctrl.createResource);
router.post('/resources/:type/delete', auth.isAuthenticated, auth.isAdmin, ctrl.deleteResources);

// Opportunities Page Route
router.get('/opportunities', ctrl.renderOpportunities);
router.get('/opportunities/new', auth.isFellow, ctrl.renderNewOpportunity);
router.post('/opportunities/new', auth.isFellow, ctrl.createOpportunity);
router.post('/opportunities/delete', auth.isAuthenticated, auth.isAdmin, ctrl.deleteOpportunities);

// Profile Page Route
router.get('/profile', auth.isAuthenticated, ctrl.renderProfile);

// Advice Group Route
router.get('/advice/:group', auth.isAuthenticated, ctrl.renderAdviceGroup);

// Comments Routes
router.get('/comments/:group', ctrl.fetchComments);
router.post('/comments', auth.isAuthenticated, ctrl.postComment);

// Signin Page Route
router.get('/signin', ctrl.renderSigninForm);
router.post('/signin', ctrl.submitFeedback);

// Calendar Routes
router.get('/calendar', ctrl.renderCalendar);
router.post('/events', auth.isFellow, ctrl.createEvent);
router.get('/events', ctrl.getEvents);
router.get('/events/:date', ctrl.getEventByDate);


router.get('/feedback', auth.isAdmin, ctrl.renderFeedbackPage);

router.get('/fellows', ctrl.renderFellows);
router.get('/fellows/new', auth.isAuthenticated, auth.isAdmin, ctrl.renderNewFellowForm);
router.post('/fellows/new', auth.isAuthenticated, auth.isAdmin, ctrl.createFellow);
export default router;
