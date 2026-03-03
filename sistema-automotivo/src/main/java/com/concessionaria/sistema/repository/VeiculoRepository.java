package com.concessionaria.sistema.repository;

import com.concessionaria.sistema.model.StatusVeiculo;
import com.concessionaria.sistema.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    @Query("SELECT v FROM Veiculo v WHERE " +
           "(:marcaId IS NULL OR v.modelo.marca.id = :marcaId) AND " +
           "(:modeloId IS NULL OR v.modelo.id = :modeloId) AND " +
           "(:ano IS NULL OR v.ano = :ano) AND " +
           "(:status IS NULL OR v.status = :status) AND " +
           "(:precoMin IS NULL OR v.preco >= :precoMin) AND " +
           "(:precoMax IS NULL OR v.preco <= :precoMax)")
    List<Veiculo> filtrar(
            @Param("marcaId") Long marcaId,
            @Param("modeloId") Long modeloId,
            @Param("ano") Integer ano,
            @Param("status") StatusVeiculo status,
            @Param("precoMin") BigDecimal precoMin,
            @Param("precoMax") BigDecimal precoMax
    );
}
