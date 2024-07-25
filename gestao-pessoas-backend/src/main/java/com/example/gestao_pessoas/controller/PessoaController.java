package com.example.gestao_pessoas.controller;

import com.example.gestao_pessoas.dto.PessoaDTO;
import com.example.gestao_pessoas.exception.CpfInvalidoException;
import com.example.gestao_pessoas.exception.CpfJaExisteException;
import com.example.gestao_pessoas.exception.PessoaNaoEncontradaException;
import com.example.gestao_pessoas.model.Pessoa;
import com.example.gestao_pessoas.service.PessoaService;
import com.example.gestao_pessoas.util.JavaUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @Operation(summary = "Cria uma nova pessoa", description = "Este endpoint cria uma nova pessoa e retorna a pessoa criada.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Pessoa criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
        @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    })
    @PostMapping
    public ResponseEntity<PessoaDTO> createPessoa(@Valid @RequestBody PessoaDTO pessoaDTO) {
        try {
            String cpfFormatado = JavaUtil.formatCpf(pessoaDTO.getCpf());

            if (!JavaUtil.isValidCpf(cpfFormatado)) {
                throw new CpfInvalidoException("CPF inválido");
            }

            Pessoa pessoa = pessoaDTO.toEntity();
            pessoa.setCpf(cpfFormatado);

            Pessoa savedPessoa = pessoaService.createPessoa(pessoa);
            return new ResponseEntity<>(PessoaDTO.fromEntity(savedPessoa), HttpStatus.CREATED);
        } catch (CpfJaExisteException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (CpfInvalidoException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Operation(summary = "Obtém todas as pessoas", description = "Este endpoint retorna uma lista de todas as pessoas cadastradas.")
    @ApiResponse(responseCode = "200", description = "Lista de pessoas retornada com sucesso")
    @GetMapping
    public ResponseEntity<List<PessoaDTO>> getAllPessoas() {
        List<Pessoa> pessoas = pessoaService.getAllPessoas();
        List<PessoaDTO> pessoaDTOs = pessoas.stream().map(PessoaDTO::fromEntity).toList();
        return new ResponseEntity<>(pessoaDTOs, HttpStatus.OK);
    }

    @Operation(summary = "Obtém uma pessoa por ID", description = "Este endpoint retorna uma pessoa com base no ID fornecido.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pessoa retornada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PessoaDTO> getPessoaById(@PathVariable Long id) {
        try {
            Pessoa pessoa = pessoaService.getPessoaById(id);
            return new ResponseEntity<>(PessoaDTO.fromEntity(pessoa), HttpStatus.OK);
        } catch (PessoaNaoEncontradaException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Atualiza uma pessoa existente", description = "Este endpoint atualiza as informações de uma pessoa com base no ID fornecido.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pessoa atualizada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Requisição inválida"),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<PessoaDTO> updatePessoa(@PathVariable Long id, @Valid @RequestBody PessoaDTO pessoaDTO) {
        try {
            String cpfFormatado = JavaUtil.formatCpf(pessoaDTO.getCpf());

            if (!JavaUtil.isValidCpf(cpfFormatado)) {
                throw new CpfInvalidoException("CPF inválido");
            }

            Pessoa pessoa = pessoaDTO.toEntity();
            pessoa.setId(id);
            pessoa.setCpf(cpfFormatado);

            Pessoa updatedPessoa = pessoaService.updatePessoa(id, pessoa);
            return new ResponseEntity<>(PessoaDTO.fromEntity(updatedPessoa), HttpStatus.OK);
        } catch (PessoaNaoEncontradaException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (CpfInvalidoException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (CpfJaExisteException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Operation(summary = "Exclui uma pessoa", description = "Este endpoint exclui uma pessoa com base no ID fornecido.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Pessoa excluída com sucesso"),
        @ApiResponse(responseCode = "404", description = "Pessoa não encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePessoa(@PathVariable Long id) {
        try {
            pessoaService.deletePessoa(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (PessoaNaoEncontradaException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}