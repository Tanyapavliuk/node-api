const { wrapper } = require("../../helpers");
const Contact = require("../../models/contact");

const handleGetAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;
  console.log(req.query);
  const skip = (page - 1) * limit;

  // фільтрація за улюбленими, якщо є такий параметер
  if (favorite) {
    const data = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    );
    res.json(data);
  }

  // find({фільтер по власнику за ід}, "поля що не відображаються",{пагінація вбудована в moongose skip - пропуск, limit - кількість})
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(data);
};

module.exports = {
  handleGetAll: wrapper(handleGetAll),
};
