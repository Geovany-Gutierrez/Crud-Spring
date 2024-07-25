package com.example.gestao_pessoas.util;

import java.util.regex.Pattern;

public class JavaUtil {

    private static final String CPF_PATTERN = "^(\\d{11})$";

    // Verifica se o CPF é válido
    public static boolean isValidCpf(String cpf) {
        if (cpf == null || !Pattern.matches(CPF_PATTERN, cpf)) {
            return false;
        }
        cpf = cpf.replaceAll("\\D", "");
        if (cpf.length() != 11) {
            return false;
        }
        int d1 = 0, d2 = 0;
        int[] pesos1 = {10, 9, 8, 7, 6, 5, 4, 3, 2};
        int[] pesos2 = {11, 10, 9, 8, 7, 6, 5, 4, 3, 2};
        char[] cpfChars = cpf.toCharArray();

        for (int i = 0; i < 9; i++) {
            d1 += (cpfChars[i] - '0') * pesos1[i];
        }
        d1 = 11 - (d1 % 11);
        d1 = (d1 > 9) ? 0 : d1;

        if (d1 != (cpfChars[9] - '0')) {
            return false;
        }

        for (int i = 0; i < 10; i++) {
            d2 += (cpfChars[i] - '0') * pesos2[i];
        }
        d2 = 11 - (d2 % 11);
        d2 = (d2 > 9) ? 0 : d2;

        return d2 == (cpfChars[10] - '0');
    }

    // Remove tudo que não for número
    public static String formatCpf(String cpf) {
        if (cpf == null) return null;
        return cpf.replaceAll("\\D", "");
    }

    // Verifica se a string é nula ou vazia
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    // Verifica se a string só tem letras e espaços
    public static boolean isAlpha(String str) {
        return str != null && str.matches("^[A-Za-z\\s]+$");
    }
}