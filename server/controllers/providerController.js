const Provider = require("../models/Provider");

const getProviders = async (req, res) => {
  try {
    const {
      search,
      type,
      location,
      service,
      verified,
      available,
      sort,
    } = req.query;

    const filter = {};

    if (type && type !== "All") {
      filter.type = type;
    }

    if (location && location !== "All") {
      filter.location = location;
    }

    if (verified === "true") {
      filter.verified = true;
    }

    if (available === "true") {
      filter.available = true;
    }

    if (search) {
      const regex = new RegExp(search, "i");

      filter.$or = [
        { name: regex },
        { type: regex },
        { location: regex },
        { description: regex },
        { services: regex },
      ];
    }

    if (service) {
      filter.services = {
        $regex: service,
        $options: "i",
      };
    }

    let sortOption = {
      rating: -1,
      name: 1,
    };

    if (sort === "rating") {
      sortOption = { rating: -1 };
    }

    if (sort === "name") {
      sortOption = { name: 1 };
    }

    const providers = await Provider.find(filter)
      .sort(sortOption)
      .lean();

    res.json({
      count: providers.length,
      providers,
    });
  } catch (error) {
    console.error("Get providers error:", error);

    res.status(500).json({
      message: "Failed to fetch providers",
    });
  }
};

const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).lean();

    if (!provider) {
      return res.status(404).json({
        message: "Provider not found",
      });
    }

    res.json(provider);
  } catch (error) {
    console.error("Get provider error:", error);

    res.status(500).json({
      message: "Failed to fetch provider",
    });
  }
};

module.exports = {
  getProviders,
  getProviderById,
};