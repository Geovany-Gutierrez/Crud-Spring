package com.example.gestao_pessoas.exception;

public class CpfInvalidoException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private final String errorCode;

    public CpfInvalidoException(String message) {
        super(message);
        this.errorCode = "CPF_INVALIDO";
    }

    public CpfInvalidoException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
