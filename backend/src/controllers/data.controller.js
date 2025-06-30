const dataService = require('../services/data.service');
const httpStatus = require('http-status');

const getMenuData = async (req, res, next) => {
  try {
    const data = await dataService.getSalesScreenData();
    res.status(httpStatus.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const getTableData = async (req, res, next) => {
    try {
        const tableTypes = await dataService.getTableTypes();
        res.status(httpStatus.OK).json({ tableTypes });
    } catch (error) {
        next(error);
    }
}

module.exports = {
  getMenuData,
  getTableData,
};