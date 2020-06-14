'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("codes", "payment-method", {
      type: Sequelize.CHAR(1, true),
    }).then(()=> queryInterface.addColumn("codes", "type", {
      type: Sequelize.CHAR(1, true),
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("codes", "payment-method")
    .then(()=> queryInterface.removeColumn("codes", "type"))
  }
};
