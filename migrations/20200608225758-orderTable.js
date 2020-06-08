'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('orders', 
      
      {  id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
    },
      product_id: {
        type: Sequelize.INTEGER(11)
      },
      code_id: {
        type: Sequelize.INTEGER(11)
      },
      quantity: {
        type: Sequelize.INTEGER(11)
      }
  
    },
    { timestamps: false  })
    .then(()=>{
      return queryInterface.addConstraint("orders", ["product_id"], {
        type: "FOREIGN KEY",
        name: "FK_products_orders",
        references: {
          table: "products",
          field: "id"
        },
        onDelete: "no action",
        onUpdate: "no action"
      })
    })
    .then(() =>{
      return queryInterface.addConstraint("orders", ["code_id"], {
        type: "FOREIGN KEY",
        name: "FK_codes_orders",
        references: {
          table: "codes",
          field: "id"
        },
        onDelete: "no action",
        onUpdate: "no action"
      })
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("orders", "FK_products_orders")
    .then(()=> queryInterface.removeConstraint("orders", "FK_codes_orders"))
    .then(()=> queryInterface.dropTable('orders'))
  }
};
