package com.example.gestao_pessoas.service;

import com.example.gestao_pessoas.exception.CpfInvalidoException;
import com.example.gestao_pessoas.exception.CpfJaExisteException;
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
        Optional<Pessoa> pessoa = pessoaRepository.findById(id);
        return pessoa.orElse(null);
    }

    public Pessoa createPessoa(Pessoa pessoa) {
    pessoa.setCpf(formatCpf(pessoa.getCpf()));
    validatePessoa(pessoa);

    // Verificar se o CPF já existe
    if (pessoaRepository.existsByCpf(pessoa.getCpf())) {
        throw new CpfJaExisteException("Já existe alguém com este CPF");
    }

    return pessoaRepository.save(pessoa);
    }


    public Pessoa updatePessoa(Long id, Pessoa pessoa) {
        pessoa.setId(id);
        String formattedCpf = formatCpf(pessoa.getCpf());
        pessoa.setCpf(formattedCpf);
        validatePessoa(pessoa);
    
        // Verificar se o CPF já existe para outra pessoa
        Optional<Pessoa> existingPessoa = pessoaRepository.findByCpf(formattedCpf);
        if (existingPessoa.isPresent() && !existingPessoa.get().getId().equals(id)) {
            throw new CpfJaExisteException("Já existe alguém com este CPF");
        }
    
        return pessoaRepository.save(pessoa);
    }
    

    public void deletePessoa(Long id) {
        pessoaRepository.deleteById(id);
    }

    private String formatCpf(String cpf) {
        if (cpf == null) return null;
        return cpf.replaceAll("\\D", "");
    }

    private void validatePessoa(Pessoa pessoa) {
        if (!isValidCpf(pessoa.getCpf())) {
            throw new CpfInvalidoException("CPF inválido");
        }
    }

    private boolean isValidCpf(String cpf) {
        // Implementar a lógica de validação de CPF aqui
        return cpf.length() == 11; 
    }
}
