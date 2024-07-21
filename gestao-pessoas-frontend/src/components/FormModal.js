import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormModal = ({ showModal, onClose, initialData, onSubmit, title }) => {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                cpf: formatCPF(initialData.cpf)
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        const today = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD

        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        else if (!/^[A-Za-z\s]+$/.test(formData.nome)) newErrors.nome = 'Nome deve conter apenas letras e espaços';

        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
        else {
            const formattedCPF = formatCPF(formData.cpf);
            if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formattedCPF)) newErrors.cpf = 'CPF inválido';
        }

        if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        else if (formData.dataNascimento > today) newErrors.dataNascimento = 'Data de nascimento não pode ser maior que a data atual';

        if (!formData.email) newErrors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await onSubmit(formData);
            setFormData({
                nome: '',
                cpf: '',
                dataNascimento: '',
                email: ''
            });
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Erro desconhecido:', error);
        }
    };

    if (!showModal) return null;

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <div className="form-group">
                                <label>Nome</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                                    value={formData.nome || ''}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    placeholder="Nome"
                                    required
                                />
                                {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                            </div>

                            <div className="form-group">
                                <label>CPF</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
                                    value={formatCPF(formData.cpf || '')}
                                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                                    placeholder="CPF"
                                    maxLength="14"
                                    required
                                />
                                {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
                            </div>

                            <div className="form-group">
                                <label>Data de Nascimento</label>
                                <input
                                    type="date"
                                    className={`form-control ${errors.dataNascimento ? 'is-invalid' : ''}`}
                                    value={formData.dataNascimento || ''}
                                    onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                                    placeholder="Data de Nascimento"
                                    required
                                />
                                {errors.dataNascimento && <div className="invalid-feedback">{errors.dataNascimento}</div>}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Email"
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
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

export default FormModal;
