exports.health = (req, res) => {
  res.status(200).send({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
};
