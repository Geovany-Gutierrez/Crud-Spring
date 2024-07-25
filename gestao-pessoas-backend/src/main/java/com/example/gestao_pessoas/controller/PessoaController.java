package com.example.gestao_pessoas.controller;

import com.example.gestao_pessoas.dto.PessoaDTO;
import com.example.gestao_pessoas.model.Pessoa;
import com.example.gestao_pessoas.service.PessoaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pessoas")
@Tag(name = "Pessoas", description = "Operações relacionadas às pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    @Operation(summary = "Obtém todas as pessoas", description = "Retorna uma lista de todas as pessoas cadastradas.")
    public List<PessoaDTO> getAllPessoas() {
        List<Pessoa> pessoas = pessoaService.getAllPessoas();
        return pessoas.stream()
                .map(PessoaDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtém uma pessoa por ID", description = "Retorna os detalhes de uma pessoa com base no ID fornecido.")
    public ResponseEntity<PessoaDTO> getPessoaById(@PathVariable Long id) {
        Pessoa pessoa = pessoaService.getPessoaById(id);
        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(PessoaDTO.fromEntity(pessoa));
    }

    @PostMapping
    @Operation(summary = "Cria uma nova pessoa", description = "Cria uma nova pessoa com base nas informações fornecidas.")
    public ResponseEntity<PessoaDTO> createPessoa(@RequestBody PessoaDTO pessoaDTO) {
        Pessoa pessoa = pessoaService.createPessoa(pessoaDTO.toEntity());
        return ResponseEntity.ok(PessoaDTO.fromEntity(pessoa));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma pessoa existente", description = "Atualiza os dados de uma pessoa existente com base no ID fornecido.")
    public ResponseEntity<PessoaDTO> updatePessoa(@PathVariable Long id, @RequestBody PessoaDTO pessoaDTO) {
        Pessoa pessoa = pessoaService.updatePessoa(id, pessoaDTO.toEntity());
        if (pessoa == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(PessoaDTO.fromEntity(pessoa));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta uma pessoa", description = "Deleta uma pessoa com base no ID fornecido.")
    public ResponseEntity<Void> deletePessoa(@PathVariable Long id) {
        if (pessoaService.deletePessoa(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
