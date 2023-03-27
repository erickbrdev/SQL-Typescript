"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("companies", [
      {
        name: "Lenovo",
        bio: "Lenovo IdeaPad S145: é uma boa opção para programadores que precisam de um notebook básico, mas com bom desempenho. Ele vem com um processador Intel Core i5, 8 GB de RAM e um SSD de 256 GB.",
        website: "https://lenovo.com.br",
        email: "lenovo@hotmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Dell",
        bio: "Dell Inspiron 14 5000: é uma opção para quem precisa de um notebook com desempenho mais robusto para programação. Ele vem com um processador Intel Core i7, 8 GB de RAM e um SSD de 512 GB.",
        website: "https://dell.com.br",
        email: "dell@hotmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
