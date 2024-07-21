package com.example.gestao_pessoas.exception;

public class CpfJaExisteException extends RuntimeException {
    public CpfJaExisteException(String message) {
        super(message);
    }
}