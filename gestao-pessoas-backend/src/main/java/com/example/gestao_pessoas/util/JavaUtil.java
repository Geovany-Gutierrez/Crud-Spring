package com.example.gestao_pessoas.util;

import java.util.regex.Pattern;

public class JavaUtil {

    private static final String CPF_PATTERN = "^(\\d{11})$";

    // Verifica se o cpf é valido (exemplo simples)
    public static boolean isValidCpf(String cpf) {
        return cpf != null && Pattern.matches(CPF_PATTERN, cpf);
    }

    // Remove tudo que nao for numero
    public static String formatCpf(String cpf) {
        if (cpf == null) return null;
        return cpf.replaceAll("\\D", "");
    }

    // Verifica se a string é nula ou vazia
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    // Verifica se a string so tem letras e numeros
    public static boolean isAlpha(String str) {
        return str != null && str.matches("^[A-Za-z\\s]+$");
    }
}
