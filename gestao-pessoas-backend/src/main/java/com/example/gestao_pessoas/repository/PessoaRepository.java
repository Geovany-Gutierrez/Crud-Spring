package com.example.gestao_pessoas.repository;

import com.example.gestao_pessoas.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    boolean existsByCpf(String cpf);
    Optional<Pessoa> findByCpf(String cpf);
}
