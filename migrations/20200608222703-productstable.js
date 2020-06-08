'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('products', 
      
      {  id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
    },
      name: {
        type: Sequelize.STRING(250)
      },
      photo: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING(250)
      },
      creation_date: {
        type: Sequelize.DATEONLY,
      },
      available:{
        type: Sequelize.BOOLEAN,
      },
      partner_id:  {
        type: Sequelize.INTEGER(11),
      },
      price:{
        type: Sequelize.FLOAT(11)
      }
  
    },
    { timestamps: false  })
    .then(() =>{

        return queryInterface.addConstraint("products", ["partner_id"], {
            type: "FOREIGN KEY",
            name: "FK_partner_products",
            references: {
              table: "partners",
              field: "id"
            },
            onDelete: "no action",
            onUpdate: "no action"
          })
    })
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("products", "FK_partner_products")
    .then(()=> queryInterface.dropTable('products'))
  }
};
