import React from 'react';

const PessoaDetails = ({ pessoa, onClose }) => {
    if (!pessoa) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalhes da Pessoa</h5>
                        <button type="button" className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Nome:</strong> {pessoa.nome}</p>
                        <p><strong>CPF:</strong> {formatCPF(pessoa.cpf)}</p>
                        <p><strong>Data de Nascimento:</strong> {pessoa.dataNascimento}</p>
                        <p><strong>Email:</strong> {pessoa.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const formatCPF = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
};

export default PessoaDetails;
