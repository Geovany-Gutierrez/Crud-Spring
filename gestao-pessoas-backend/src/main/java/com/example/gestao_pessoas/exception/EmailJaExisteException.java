package com.example.gestao_pessoas.exception;

public class EmailJaExisteException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private final String errorCode;

    public EmailJaExisteException(String message) {
        super(message);
        this.errorCode = "EMAIL_JA_EXISTE";
    }

    public EmailJaExisteException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
