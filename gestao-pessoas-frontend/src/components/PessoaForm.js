import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PessoaForm = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pessoa = { nome, cpf, dataNascimento, email };
        try {
            await axios.post('http://localhost:8080/api/pessoas', pessoa);
            // Handle success, e.g., clear form or redirect
        } catch (error) {
            // Handle error
            console.error('Error creating pessoa', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                required
            />
            <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="CPF"
                required
            />
            <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                placeholder="Data de Nascimento"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <button type="submit">Salvar</button>
        </form>
    );
};

export default PessoaForm;
