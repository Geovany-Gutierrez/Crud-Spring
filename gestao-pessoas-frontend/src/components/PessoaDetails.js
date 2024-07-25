import React from 'react';

const formatCPF = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
};

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

export default PessoaDetails;
