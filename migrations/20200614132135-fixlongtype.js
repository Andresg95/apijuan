'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.changeColumn(
      'users',
      'photo',
      {
        type: Sequelize.TEXT('LONG'),
        
      }
    ).then(()=>{
      queryInterface.changeColumn(
        'products',
        'photo',
        {
          type: Sequelize.TEXT('LONG'),
         
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
   return  queryInterface.changeColumn(
      'users',
      'photo',
      {
        type: Sequelize.TEXT,
        
      }
    ).then(()=>{
      queryInterface.changeColumn(
        'products',
        'photo',
        {
          type: Sequelize.TEXT,
         
        }
      )
    })
  }
};
