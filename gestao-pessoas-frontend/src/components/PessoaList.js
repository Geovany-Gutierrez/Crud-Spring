import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal';

const formatCPF = (value) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');

    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
};

const PessoaList = ({ setSelectedPessoa }) => {
    const [pessoas, setPessoas] = useState([]);
    const [filteredPessoas, setFilteredPessoas] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pessoaToEdit, setPessoaToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPessoas();
    }, []);

    useEffect(() => {
        setFilteredPessoas(
            pessoas.filter((pessoa) =>
                pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, pessoas]);

    const fetchPessoas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pessoas');
            setPessoas(response.data);
        } catch (error) {
            console.error('Error fetching pessoas', error);
        }
    };

    const handleEdit = (pessoa) => {
        setPessoaToEdit(pessoa);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            try {
                await axios.delete(`http://localhost:8080/api/pessoas/${id}`);
                fetchPessoas();
                setSelectedPessoa(null); 
            } catch (error) {
                console.error('Error deleting pessoa', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Lista de Pessoas</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredPessoas.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    Não há dados disponíveis.
                </div>
            ) : (
                <ul className="list-group">
                    {filteredPessoas.map((pessoa) => (
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
            )}

            {pessoaToEdit && (
                <EditModal
                    showModal={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    pessoaToEdit={pessoaToEdit}
                    fetchPessoas={fetchPessoas}
                />
            )}
        </div>
    );
};

export default PessoaList;
