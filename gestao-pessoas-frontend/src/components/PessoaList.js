import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PessoaList = ({ setSelectedPessoa }) => {
    const [pessoas, setPessoas] = useState([]);
    const [selectedPessoa, setSelectedPessoaInternal] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editPessoa, setEditPessoa] = useState({
        nome: '',
        cpf: '',
        dataNascimento: '',
        email: ''
    });

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
        try {
            await axios.delete(`http://localhost:8080/api/pessoas/${id}`);
            fetchPessoas();
            setSelectedPessoa(null); // Clear selected person on delete
        } catch (error) {
            console.error('Error deleting pessoa', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/pessoas/${editPessoa.id}`, editPessoa);
            fetchPessoas();
            setIsEditing(false);
            setEditPessoa({
                nome: '',
                cpf: '',
                dataNascimento: '',
                email: ''
            });
        } catch (error) {
            console.error('Error updating pessoa', error);
        }
    };

    return (
        <div>
            <h2>Lista de Pessoas</h2>
            <ul>
                {pessoas.map((pessoa) => (
                    <li key={pessoa.id}>
                        <span onClick={() => setSelectedPessoa(pessoa)}>{pessoa.nome} - {pessoa.email}</span>
                        <button onClick={() => handleEdit(pessoa)}>Editar</button>
                        <button onClick={() => handleDelete(pessoa.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            {isEditing && (
                <form onSubmit={handleUpdate}>
                    <h3>Editar Pessoa</h3>
                    <input
                        type="text"
                        value={editPessoa.nome}
                        onChange={(e) => setEditPessoa({ ...editPessoa, nome: e.target.value })}
                        placeholder="Nome"
                        required
                    />
                    <input
                        type="text"
                        value={editPessoa.cpf}
                        onChange={(e) => setEditPessoa({ ...editPessoa, cpf: e.target.value })}
                        placeholder="CPF"
                        required
                    />
                    <input
                        type="date"
                        value={editPessoa.dataNascimento}
                        onChange={(e) => setEditPessoa({ ...editPessoa, dataNascimento: e.target.value })}
                        placeholder="Data de Nascimento"
                        required
                    />
                    <input
                        type="email"
                        value={editPessoa.email}
                        onChange={(e) => setEditPessoa({ ...editPessoa, email: e.target.value })}
                        placeholder="Email"
                        required
                    />
                    <button type="submit">Atualizar</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default PessoaList;
