package com.concessionaria.sistema.controller;

import com.concessionaria.sistema.model.Modelo;
import com.concessionaria.sistema.repository.ModeloRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/modelos")
public class ModeloController {

    private final ModeloRepository modeloRepository;

    public ModeloController(ModeloRepository modeloRepository) {
        this.modeloRepository = modeloRepository;
    }

    @GetMapping
    public List<Modelo> listarTodos() {
        return modeloRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modelo> buscarPorId(@PathVariable Long id) {
        return modeloRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/marca/{marcaId}")
    public List<Modelo> listarPorMarca(@PathVariable Long marcaId) {
        return modeloRepository.findByMarcaId(marcaId);
    }

    @PostMapping
    public Modelo criar(@Valid @RequestBody Modelo modelo) {
        return modeloRepository.save(modelo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modelo> atualizar(@PathVariable Long id, @Valid @RequestBody Modelo modeloAtualizado) {
        return modeloRepository.findById(id)
                .map(modelo -> {
                    modelo.setNome(modeloAtualizado.getNome());
                    modelo.setMarca(modeloAtualizado.getMarca());
                    return ResponseEntity.ok(modeloRepository.save(modelo));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (modeloRepository.existsById(id)) {
            modeloRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
