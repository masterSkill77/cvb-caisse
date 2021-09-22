'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payementfous', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idprovision:{
        type:Sequelize.INTEGER,
        // reference:{model:'listeappros', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:true,
      },
      payee: {
        type: Sequelize.INTEGER
      },
      datepayement: {
        type: Sequelize.DATE
      },
      dateEcheance: {
        type: Sequelize.DATE
      },
      net: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payementfous');
  }
};