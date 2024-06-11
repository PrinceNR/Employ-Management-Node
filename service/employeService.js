const Employes = require("../models/employmodels");

const searchEmployees = async function (searchFunciton, skip, limit) {
  const result = await Employes.aggregate([
    { $match: searchFunciton },
    {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: [
          { $skip: skip },
          { $limit: limit },
          { $sort: { createdAt: -1 } }
        ]
      }
    }
  ]);

  const totalCount = result[0].totalCount[0]?.count || 0;
  const data = result[0].data;
  console.log(data);

  return { totalCount , data}
};
const createEmployee = async (employeeData) => {
  return await Employes.create(employeeData);
};

const getEmployeeById = async (id) => {
  return await Employes.findById(id);
};

const updateEmployee = async (id, updateData) => {
  return await Employes.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEmployee = async (id) => {
  return await Employes.findByIdAndDelete(id);
};

const updateEmployeeImage = async (id, imagePath) => {
  return await Employes.findByIdAndUpdate(id, { avatar: imagePath });
};

module.exports = {
  searchEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  updateEmployeeImage,
};
