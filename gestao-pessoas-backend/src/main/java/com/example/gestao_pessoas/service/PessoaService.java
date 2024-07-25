package com.example.gestao_pessoas.service;

import com.example.gestao_pessoas.exception.CpfJaExisteException;
import com.example.gestao_pessoas.exception.PessoaNaoEncontradaException;
import com.example.gestao_pessoas.model.Pessoa;
import com.example.gestao_pessoas.repository.PessoaRepository;
import com.example.gestao_pessoas.util.JavaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    public List<Pessoa> getAllPessoas() {
        return pessoaRepository.findAll();
    }

    public Pessoa getPessoaById(Long id) {
        return pessoaRepository.findById(id)
                .orElseThrow(() -> new PessoaNaoEncontradaException("Pessoa com ID " + id + " não encontrada"));
    }

    public Pessoa createPessoa(Pessoa pessoa) {
        try {
            String cpfFormatado = JavaUtil.formatCpf(pessoa.getCpf());

            if (!JavaUtil.isValidCpf(cpfFormatado)) {
                throw new IllegalArgumentException("CPF inválido");
            }

            if (pessoaRepository.existsByCpf(cpfFormatado)) {
                throw new CpfJaExisteException("Já existe alguém com este CPF");
            }

            pessoa.setCpf(cpfFormatado);
            return pessoaRepository.save(pessoa);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public Pessoa updatePessoa(Long id, Pessoa pessoa) {
        if (!pessoaRepository.existsById(id)) {
            throw new PessoaNaoEncontradaException("Pessoa com ID " + id + " não encontrada");
        }

        String cpfFormatado = JavaUtil.formatCpf(pessoa.getCpf());

        if (!JavaUtil.isValidCpf(cpfFormatado)) {
            throw new IllegalArgumentException("CPF inválido");
        }

        pessoa.setId(id);
        pessoa.setCpf(cpfFormatado);

        Optional<Pessoa> existingPessoa = pessoaRepository.findByCpf(cpfFormatado);
        if (existingPessoa.isPresent() && !existingPessoa.get().getId().equals(id)) {
            throw new CpfJaExisteException("Já existe alguém com este CPF");
        }

        return pessoaRepository.save(pessoa);
    }

    public void deletePessoa(Long id) {
        if (!pessoaRepository.existsById(id)) {
            throw new PessoaNaoEncontradaException("Pessoa com ID " + id + " não encontrada");
        }

        pessoaRepository.deleteById(id);
    }
}