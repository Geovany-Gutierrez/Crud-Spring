import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal';
import FormModal from './FormModal'; 

const formatCPF = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }
    return cleaned;
};

const PessoaList = ({ setSelectedPessoa }) => {
    const [pessoas, setPessoas] = useState([]);
    const [filteredPessoas, setFilteredPessoas] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pessoaToEdit, setPessoaToEdit] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPessoas = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/pessoas');
            setPessoas(response.data);
        } catch (error) {
            console.error('Erro ao buscar pessoas', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPessoas();
    }, []);

    useEffect(() => {
        setFilteredPessoas(
            pessoas.filter(pessoa =>
                pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, pessoas]);

    const handleEdit = async (pessoa) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/pessoas/${pessoa.id}`);
            setPessoaToEdit(response.data);
            setShowEditModal(true);
        } catch (error) {
            console.error('Erro ao buscar detalhes da pessoa', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
            try {
                await axios.delete(`http://localhost:8080/api/pessoas/${id}`);
                fetchPessoas();
                setSelectedPessoa(null);
            } catch (error) {
                console.error('Erro ao excluir pessoa', error);
            }
        }
    };

    const handleCreate = () => {
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
    };

    const handleFormSubmit = async (data) => {
        try {
            await axios.post('http://localhost:8080/api/pessoas', data);
            fetchPessoas();
            handleCloseFormModal();
        } catch (error) {
            console.error('Erro ao criar pessoa', error);
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

            <button className="btn btn-primary mb-3" onClick={handleCreate}>Adicionar Pessoa</button>

            {loading && (
                <div className="d-flex justify-content-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Carregando...</span>
                    </div>
                </div>
            )}

            {filteredPessoas.length === 0 && !loading ? (
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
                    onClose={() => {
                        setShowEditModal(false);
                        setPessoaToEdit(null);
                    }}
                    pessoaToEdit={pessoaToEdit}
                    fetchPessoas={fetchPessoas}
                />
            )}

            {showFormModal && (
                <FormModal
                    showModal={showFormModal}
                    onClose={handleCloseFormModal}
                    initialData={{}}
                    onSubmit={handleFormSubmit}
                    title="Adicionar Pessoa"
                />
            )}
        </div>
    );
};

export default PessoaList;