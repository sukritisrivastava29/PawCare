const express = require("express");

const {
  getProviders,
  getProviderById,
} = require("../controllers/providerController");

const router = express.Router();

router.get("/", getProviders);
router.get("/:id", getProviderById);

module.exports = router;