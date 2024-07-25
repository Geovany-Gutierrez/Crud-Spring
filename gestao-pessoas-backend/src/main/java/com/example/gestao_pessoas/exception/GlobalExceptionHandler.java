package com.example.gestao_pessoas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CpfInvalidoException.class)
    public ResponseEntity<ErrorResponse> handleCpfInvalidoException(CpfInvalidoException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getErrorCode(), ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CpfJaExisteException.class)
    public ResponseEntity<ErrorResponse> handleCpfJaExisteException(CpfJaExisteException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getErrorCode(), ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PessoaNaoEncontradaException.class)
    public ResponseEntity<ErrorResponse> handlePessoaNaoEncontradaException(PessoaNaoEncontradaException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getErrorCode(), ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PessoaNaoEncontradaException.class)
    public ResponseEntity<ErrorResponse> handlePessoaNaoEncontradaException(EmailJaExisteException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getErrorCode(), ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse("INTERNAL_SERVER_ERROR", "Ocorreu um erro interno no servidor");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
