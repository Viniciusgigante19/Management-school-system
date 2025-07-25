export async function up(queryInterface, Sequelize) {
  // Criar o ENUM antes da tabela para evitar problemas
  await queryInterface.sequelize.query(`
    CREATE TYPE "enum_alunos_plano_pagamento" AS ENUM('mensal', 'trimestral', 'anual');
  `);

  await queryInterface.createTable('alunos', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    plano_pagamento: {
      type: 'enum_alunos_plano_pagamento',
      allowNull: false,
    },
    ano_turma: {          // Novo campo ano da turma
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    classe: {             // Novo campo classe/período
      type: Sequelize.STRING(5),
      allowNull: false,
    },
    responsavel_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'responsaveis',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    data_matricula: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('alunos');
  await queryInterface.sequelize.query(`
    DROP TYPE IF EXISTS "enum_alunos_plano_pagamento";
  `);
}
