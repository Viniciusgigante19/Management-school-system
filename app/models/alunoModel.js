import { DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize.js';

const Aluno = sequelize.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY, // corrigido: DATAONLY -> DATEONLY
    allowNull: true,
  },
  plano_pagamento: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['mensal', 'trimestral', 'anual']],
    },
  },
  id_turma: {
    type: DataTypes.INTEGER,
    references: {
      model: 'turmas',
      key: 'id',
    },
  },
  responsavel_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'responsaveis',
      key: 'id',
    },
    allowNull: true, 
  },
  data_matricula: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'alunos',
  timestamps: false,
});

export default Aluno;
