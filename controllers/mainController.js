import Customer from '../models/Customer.js';
import Opportunities from '../models/Opportunities.js';
import Comment from '../models/Comment.js';
import Feedback from '../models/Feedback.js';
import Event from '../models/Event.js';
import Resource from '../models/Resource.js';
import Fellow from '../models/Fellow.js';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export const renderFellows = async (req, res) => {
    try {
        const fellows = await Fellow.find({});
        res.render('fellows', { fellows, status: req.user ? req.user.status : 'guest' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const renderNewFellowForm = (req, res) => {
    res.render('newFellow', { status: req.user ? req.user.status : 'guest' });
};

export const createFellow = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, description, day } = req.body;
            const image = req.file ? `/images/${req.file.filename}` : '';
            const newFellow = new Fellow({ name, description, day, image });
            await newFellow.save();
            res.redirect('/fellows');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
];

export const renderIndex = (req, res) => {
    res.render('index');  // Uses views/index.ejs
};

export const renderAdvice = (req, res) => {
    res.render('advice');  // Uses views/advice.ejs
};

export const renderAdviceGroup = (req, res) => {
    const group = req.params.group;
    const status = req.user ? req.user.status : 'guest';
    res.render('advice', { group, status });  // Pass the group and status to the view
};

export const renderOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunities.find({});
        const status = req.user ? req.user.status : 'guest';
        res.render('opportunities', { opportunities, status: status });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const renderNewOpportunity = async (req, res) => {
    let customer = await Customer.findById(req.user._id);
    res.render('newOpportunity', { user: customer });  // Uses views/newOpportunity.ejs
};

export const createOpportunity = async (req, res) => {
    try {
        const { title, description, deadline, link, type } = req.body;
        const newOpportunity = new Opportunities({ title, description, deadline, link, type });
        await newOpportunity.save();
        res.redirect('/opportunities');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const renderProfile = async (req, res) => {
    let customer = await Customer.findById(req.user._id);
    res.render('profile', { user: customer });  // New function to render profile page
};

export const deleteOpportunities = async (req, res) => {
    try {
        const opportunityIds = req.body.opportunities;
        if (!opportunityIds) {
            return res.status(400).send('No opportunities selected');
        }
        await Opportunities.deleteMany({ _id: { $in: opportunityIds } });
        res.redirect('/opportunities');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const fetchComments = async (req, res) => {
  try {
    const group = req.params.group;
    const comments = await Comment.find({ group }).populate('replies').exec();
    res.json(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const postComment = async (req, res) => {
  try {
    const { content, group, parentId } = req.body;
    let customer = await Customer.findById(req.user._id);
    const status = customer.status || 'guest';
    const newComment = new Comment({ content, group, status, parentId });

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    }

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderSigninForm = (req, res) => {
  res.render('signin');
};

export const submitFeedback = async (req, res) => {
  try {
    const { name, grade, assignment, noiseLevel, helpfulness, startTime } = req.body;
    const endTime = new Date();
    const duration = (new Date(endTime) - new Date(startTime)) / 6000; // Duration in minutes

    const newFeedback = new Feedback({
      name,
      grade,
      assignment,
      noiseLevel,
      helpfulness,
      startTime,
      endTime,
      duration
    });

    await newFeedback.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderCalendar = async (req, res) => {
    try {
        const events = await Event.find({});
        res.render('calendar', { events, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createEvent = async (req, res) => {
    try {
        const { title, time, description, date } = req.body;
        const newEvent = new Event({ title, time, description, date });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getEvents = async (req, res) => {
    try {
        const { month, year } = req.query;
        const events = await Event.find({
            date: {
                $gte: new Date(year, month, 1),
                $lt: new Date(year, parseInt(month) + 1, 1)
            }
        });
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getEventByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const event = await Event.findOne({ date: new Date(date) });
        res.json(event);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export const renderNewResourceForm = (req, res) => {
    const type = req.params.type;
    res.render('newresource', { type });
};

export const createResource = async (req, res) => {
    try {
        const { title, time, description, link, type } = req.body;
        const newResource = new Resource({ title, time, description, link, type });
        await newResource.save();
        res.redirect(``);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteResources = async (req, res) => {
    try {
        const resourceIds = req.body.resources;
        if (!resourceIds) {
            return res.status(400).send('No resources selected');
        }
        await Resource.deleteMany({ _id: { $in: resourceIds } });
        res.redirect(`/${req.body.type}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const renderResourceGroup = async (req, res) => {
    try {
        const type = req.params.type;
        const resources = await Resource.find({ type });
        const status = req.user ? req.user.status : 'guest';
        res.render('resource', { resources, type, status });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Function to render the feedback page
export const renderFeedbackPage = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ startTime: -1 }).exec();

        // Calculate average ratings and average time
        const totalFeedbacks = feedbacks.length;
        const totalNoiseLevel = feedbacks.reduce((sum, feedback) => sum + feedback.noiseLevel, 0);
        const totalHelpfulness = feedbacks.reduce((sum, feedback) => sum + feedback.helpfulness, 0);
        const totalDuration = feedbacks.reduce((sum, feedback) => sum + feedback.duration, 0);

        const averageNoiseLevel = totalNoiseLevel / totalFeedbacks;
        const averageHelpfulness = totalHelpfulness / totalFeedbacks;
        const averageDuration = totalDuration / totalFeedbacks;

        res.render('adminFeedback', {
            feedbacks,
            averageNoiseLevel,
            averageHelpfulness,
            averageDuration
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
