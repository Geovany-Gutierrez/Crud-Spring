package com.example.gestao_pessoas.service;

import com.example.gestao_pessoas.exception.CpfInvalidoException;
import com.example.gestao_pessoas.exception.CpfJaExisteException;
import com.example.gestao_pessoas.exception.PessoaNaoEncontradaException;
import com.example.gestao_pessoas.model.Pessoa;
import com.example.gestao_pessoas.repository.PessoaRepository;
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
        pessoa.setCpf(formatCpf(pessoa.getCpf()));
        validatePessoa(pessoa);

        if (pessoaRepository.existsByCpf(pessoa.getCpf())) {
            throw new CpfJaExisteException("Já existe alguém com este CPF");
        }

        return pessoaRepository.save(pessoa);
    }

    public Pessoa updatePessoa(Long id, Pessoa pessoa) {
        if (!pessoaRepository.existsById(id)) {
            throw new PessoaNaoEncontradaException("Pessoa com ID " + id + " não encontrada");
        }

        pessoa.setId(id);
        String formattedCpf = formatCpf(pessoa.getCpf());
        pessoa.setCpf(formattedCpf);
        validatePessoa(pessoa);

        Optional<Pessoa> existingPessoa = pessoaRepository.findByCpf(formattedCpf);
        if (existingPessoa.isPresent() && !existingPessoa.get().getId().equals(id)) {
            throw new CpfJaExisteException("Já existe alguém com este CPF");
        }

        return pessoaRepository.save(pessoa);
    }

    public boolean deletePessoa(Long id) {
        if (!pessoaRepository.existsById(id)) {
            throw new PessoaNaoEncontradaException("Pessoa com ID " + id + " não encontrada");
        }

        pessoaRepository.deleteById(id);
        return true;
    }

    private String formatCpf(String cpf) {
        return cpf != null ? cpf.replaceAll("\\D", "") : null;
    }

    private void validatePessoa(Pessoa pessoa) {
        if (!isValidCpf(pessoa.getCpf())) {
            throw new CpfInvalidoException("CPF inválido");
        }
    }

    private boolean isValidCpf(String cpf) {
        if (cpf == null || cpf.length() != 11 || cpf.chars().allMatch(Character::isDigit)) {
            return false;
        }

        int[] digits = cpf.chars().map(c -> c - '0').toArray();
        int firstDigit = calculateCheckDigit(digits, 10);
        int secondDigit = calculateCheckDigit(digits, 11);

        return digits[9] == firstDigit && digits[10] == secondDigit;
    }

    private int calculateCheckDigit(int[] digits, int weight) {
        int sum = 0;
        for (int i = 0; i < weight - 1; i++) {
            sum += digits[i] * (weight - i);
        }
        int remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}