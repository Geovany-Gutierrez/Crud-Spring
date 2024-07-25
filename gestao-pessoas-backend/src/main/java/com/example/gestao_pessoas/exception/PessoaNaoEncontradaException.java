package com.example.gestao_pessoas.exception;

public class PessoaNaoEncontradaException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private final String errorCode;

    public PessoaNaoEncontradaException(String message) {
        super(message);
        this.errorCode = "PESSOA_NAO_ENCONTRADA";
    }

    public PessoaNaoEncontradaException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
