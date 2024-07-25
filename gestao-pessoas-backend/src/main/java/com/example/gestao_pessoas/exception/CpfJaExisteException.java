package com.example.gestao_pessoas.exception;

public class CpfJaExisteException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private final String errorCode;

    public CpfJaExisteException(String message) {
        super(message);
        this.errorCode = "CPF_JA_EXISTE";
    }

    public CpfJaExisteException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}