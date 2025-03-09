const express = require("express")
const router = express.Router()
const messageController = require("../controllers/chatcontroller/chat")
const auth = require("../midlleware/Adminmidlleware")

// All routes require authentication
//router.use(auth)

// Send a message
router.post("/", messageController.sendMessage)

// Get messages between current user and another user
router.get("/:userId", messageController.getMessages)

// Get unread message count from a specific user
router.get("/:userId/unread", messageController.getUnreadCountFromUser)

// Get total unread message count
router.get("/unread/total", messageController.getTotalUnreadCount)

module.exports = router

