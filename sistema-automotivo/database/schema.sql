-- ===========================================
-- Sistema Automotivo - Gestao de Estoque
-- Script de criacao do banco de dados MySQL
-- ===========================================

CREATE DATABASE IF NOT EXISTS concessionaria;
USE concessionaria;

-- Tabela de Marcas
CREATE TABLE marcas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Modelos
CREATE TABLE modelos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca_id BIGINT NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES marcas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Veiculos
CREATE TABLE veiculos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    modelo_id BIGINT NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    preco DECIMAL(12, 2) NOT NULL,
    quilometragem INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DISPONIVEL',
    FOREIGN KEY (modelo_id) REFERENCES modelos(id) ON DELETE CASCADE,
    CHECK (status IN ('DISPONIVEL', 'VENDIDO', 'RESERVADO'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================
-- Dados de exemplo
-- ===========================================

-- Marcas
INSERT INTO marcas (nome) VALUES ('Toyota');
INSERT INTO marcas (nome) VALUES ('Honda');
INSERT INTO marcas (nome) VALUES ('Volkswagen');
INSERT INTO marcas (nome) VALUES ('Chevrolet');
INSERT INTO marcas (nome) VALUES ('Fiat');

-- Modelos
INSERT INTO modelos (nome, marca_id) VALUES ('Corolla', 1);
INSERT INTO modelos (nome, marca_id) VALUES ('Hilux', 1);
INSERT INTO modelos (nome, marca_id) VALUES ('Civic', 2);
INSERT INTO modelos (nome, marca_id) VALUES ('HR-V', 2);
INSERT INTO modelos (nome, marca_id) VALUES ('Gol', 3);
INSERT INTO modelos (nome, marca_id) VALUES ('T-Cross', 3);
INSERT INTO modelos (nome, marca_id) VALUES ('Onix', 4);
INSERT INTO modelos (nome, marca_id) VALUES ('Tracker', 4);
INSERT INTO modelos (nome, marca_id) VALUES ('Argo', 5);
INSERT INTO modelos (nome, marca_id) VALUES ('Pulse', 5);

-- Veiculos
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (1, 2023, 'Branco', 145000.00, 15000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (1, 2022, 'Prata', 135000.00, 32000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (2, 2024, 'Preto', 280000.00, 5000, 'RESERVADO');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (3, 2023, 'Cinza', 155000.00, 18000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (5, 2021, 'Vermelho', 65000.00, 45000, 'VENDIDO');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (7, 2024, 'Azul', 95000.00, 0, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (9, 2023, 'Branco', 82000.00, 12000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (10, 2024, 'Preto', 115000.00, 3000, 'RESERVADO');
