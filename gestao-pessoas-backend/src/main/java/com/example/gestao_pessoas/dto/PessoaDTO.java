package com.example.gestao_pessoas.dto;

import com.example.gestao_pessoas.model.Pessoa;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PessoaDTO {

    @Schema(description = "ID da pessoa", example = "1", required = false, hidden = true)
    private Long id;

    @NotBlank(message = "Nome não pode estar vazio")
    @Size(max = 100, message = "Nome não pode ter mais que 100 caracteres")
    @Schema(description = "Nome completo da pessoa", example = "Geovany", required = true)
    private String nome;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 dígitos")
    @Schema(description = "CPF da pessoa", example = "12345678901", required = true)
    private String cpf;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "Data de nascimento da pessoa", example = "1990-01-01", required = true)
    private LocalDate dataNascimento;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    @Schema(description = "Email da pessoa", example = "guti@gmail.com", required = true)
    private String email;

    public static PessoaDTO fromEntity(Pessoa pessoa) {
        if (pessoa == null) {
            return null;
        }
        
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
