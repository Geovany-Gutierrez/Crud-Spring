package com.example.gestao_pessoas.dto;

import com.example.gestao_pessoas.model.Pessoa;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public class PessoaDTO {

    private Long id;
    private String nome;
    private String cpf;

    @JsonFormat(pattern = "yyyy-MM-dd") 
    private LocalDate dataNascimento;
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // conversao
    public static PessoaDTO fromEntity(Pessoa pessoa) {
        PessoaDTO dto = new PessoaDTO();
        dto.setId(pessoa.getId());
        dto.setNome(pessoa.getNome());
        dto.setCpf(pessoa.getCpf());
        dto.setDataNascimento(pessoa.getDataNascimento());
        dto.setEmail(pessoa.getEmail());
        return dto;
    }

    public Pessoa toEntity() {
        Pessoa pessoa = new Pessoa();
        pessoa.setId(this.id);
        pessoa.setNome(this.nome);
        pessoa.setCpf(this.cpf);
        pessoa.setDataNascimento(this.dataNascimento);
        pessoa.setEmail(this.email);
        return pessoa;
    }
}
