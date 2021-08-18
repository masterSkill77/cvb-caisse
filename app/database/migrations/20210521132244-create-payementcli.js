'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payementclis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcommande:{
        type:Sequelize.INTEGER,
        reference:{model:'listecomms', key:'id'},
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
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
      remise: {
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
    await queryInterface.dropTable('payementclis');
  }
};