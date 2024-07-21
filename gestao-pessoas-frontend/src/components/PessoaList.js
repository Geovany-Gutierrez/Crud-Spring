import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatCPF = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, ''); // Remove all non-numeric characters

    // Format CPF
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
};

const PessoaList = ({ setSelectedPessoa }) => {
    const [pessoas, setPessoas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editPessoa, setEditPessoa] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchPessoas();
    }, []);

    const fetchPessoas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pessoas');
            setPessoas(response.data);
        } catch (error) {
            console.error('Error fetching pessoas', error);
        }
    };

    const handleEdit = (pessoa) => {
        setEditPessoa(pessoa);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            try {
                await axios.delete(`http://localhost:8080/api/pessoas/${id}`);
                fetchPessoas();
                setSelectedPessoa(null); // Clear selected person on delete
            } catch (error) {
                console.error('Error deleting pessoa', error);
            }
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!editPessoa.nome) newErrors.nome = 'Nome é obrigatório';
        if (!editPessoa.cpf) newErrors.cpf = 'CPF é obrigatório';
        else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formatCPF(editPessoa.cpf))) newErrors.cpf = 'CPF inválido';
        if (!editPessoa.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
        if (!editPessoa.email) newErrors.email = 'Email é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(editPessoa.email)) newErrors.email = 'Email inválido';
        return newErrors;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/pessoas/${editPessoa.id}`, {
                ...editPessoa,
                cpf: editPessoa.cpf.replace(/\D/g, '') // Remove formatting for backend
            });
            fetchPessoas();
            setIsEditing(false);
            setEditPessoa({
                nome: '',
                cpf: '',
                dataNascimento: '',
                email: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error updating pessoa', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Pessoas</h2>
            <ul className="list-group">
                {pessoas.map((pessoa) => (
                    <li key={pessoa.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span onClick={() => setSelectedPessoa(pessoa)} style={{ cursor: 'pointer' }}>
                            {pessoa.nome} - {formatCPF(pessoa.cpf)}
                        </span>
                        <div>
                            <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(pessoa)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pessoa.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>

            {isEditing && (
                <form onSubmit={handleUpdate} className="mt-4">
                    <h3>Editar Pessoa</h3>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                            value={editPessoa.nome}
                            onChange={(e) => setEditPessoa({ ...editPessoa, nome: e.target.value })}
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
                            value={formatCPF(editPessoa.cpf)}
                            onChange={(e) => setEditPessoa({ ...editPessoa, cpf: e.target.value })}
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
                            value={editPessoa.dataNascimento}
                            onChange={(e) => setEditPessoa({ ...editPessoa, dataNascimento: e.target.value })}
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
                            value={editPessoa.email}
                            onChange={(e) => setEditPessoa({ ...editPessoa, email: e.target.value })}
                            placeholder="Email"
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Atualizar</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default PessoaList;
