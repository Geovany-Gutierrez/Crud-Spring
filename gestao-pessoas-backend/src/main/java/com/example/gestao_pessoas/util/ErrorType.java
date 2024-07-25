package com.example.gestao_pessoas.util;

public enum ErrorType {
    INVALID_CPF("CPF inválido"),
    CPF_ALREADY_EXISTS("CPF já existe"),
    EMAIL_ALREADY_EXISTS("Email já existe"),
    PERSON_NOT_FOUND("Pessoa não encontrada");

    private final String message;

    ErrorType(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
