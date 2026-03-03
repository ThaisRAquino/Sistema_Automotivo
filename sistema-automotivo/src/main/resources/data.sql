-- Dados de exemplo carregados automaticamente pelo H2

INSERT INTO marcas (nome) VALUES ('Toyota');
INSERT INTO marcas (nome) VALUES ('Honda');
INSERT INTO marcas (nome) VALUES ('Volkswagen');
INSERT INTO marcas (nome) VALUES ('Chevrolet');
INSERT INTO marcas (nome) VALUES ('Fiat');

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

INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (1, 2023, 'Branco', 145000.00, 15000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (1, 2022, 'Prata', 135000.00, 32000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (2, 2024, 'Preto', 280000.00, 5000, 'RESERVADO');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (3, 2023, 'Cinza', 155000.00, 18000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (5, 2021, 'Vermelho', 65000.00, 45000, 'VENDIDO');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (7, 2024, 'Azul', 95000.00, 0, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (9, 2023, 'Branco', 82000.00, 12000, 'DISPONIVEL');
INSERT INTO veiculos (modelo_id, ano, cor, preco, quilometragem, status) VALUES (10, 2024, 'Preto', 115000.00, 3000, 'RESERVADO');
