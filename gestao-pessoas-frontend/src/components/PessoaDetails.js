import React from 'react';

const PessoaDetails = ({ pessoa }) => {
    if (!pessoa) return <p>Selecione uma pessoa para ver os detalhes.</p>;

    return (
        <div>
            <h2>Detalhes da Pessoa</h2>
            <p><strong>Nome:</strong> {pessoa.nome}</p>
            <p><strong>CPF:</strong> {pessoa.cpf}</p>
            <p><strong>Data de Nascimento:</strong> {pessoa.dataNascimento}</p>
            <p><strong>Email:</strong> {pessoa.email}</p>
        </div>
    );
};

export default PessoaDetails;
