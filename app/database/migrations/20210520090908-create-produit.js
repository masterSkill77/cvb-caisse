'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idintrant:{
        type:Sequelize.INTEGER,
        reference:{model:'intrants', key:'id', onDelete:'CASCADE',
        onUpdate: 'CASCADE'},
        allowNull:false,
      },
      name: {
        type: Sequelize.STRING
      },
      stocks: {
        type: Sequelize.INTEGER
      },
      unite: {
        type: Sequelize.STRING
      },
      presentation: {
        type: Sequelize.STRING
      },
      parpresentation: {
        type: Sequelize.INTEGER
      },
      pugros: {
        type: Sequelize.INTEGER
      },
      pudetail: {
        type: Sequelize.INTEGER
      },
      puvente: {
        type: Sequelize.INTEGER
      },
      tva: {
        type: Sequelize.INTEGER
      },
       dateperemption: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('produits');
  }
};