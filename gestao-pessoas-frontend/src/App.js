import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PessoaList from './components/PessoaList';
import PessoaDetails from './components/PessoaDetails';
import FormModal from './components/FormModal';

function App() {
    const [pessoas, setPessoas] = useState([]);
    const [selectedPessoa, setSelectedPessoa] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [formType, setFormType] = useState('create');
    const [currentPessoa, setCurrentPessoa] = useState(null);

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

    const handleOpenDetails = (pessoa) => {
        setSelectedPessoa(pessoa);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setSelectedPessoa(null);
        setShowDetails(false);
    };

    const handleOpenForm = (type, pessoa = null) => {
        setFormType(type);
        setCurrentPessoa(pessoa);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setCurrentPessoa(null);
        setShowForm(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (formType === 'create') {
                await axios.post('http://localhost:8080/api/pessoas', {
                    ...formData,
                    cpf: formData.cpf.replace(/\D/g, '')
                });
            } else if (formType === 'edit') {
                await axios.put(`http://localhost:8080/api/pessoas/${formData.id}`, {
                    ...formData,
                    cpf: formData.cpf.replace(/\D/g, '')
                });
            }
            await fetchPessoas();
            handleCloseForm();
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Gestão de Pessoas</h1>
            <button
                className="btn btn-primary mb-3"
                onClick={() => handleOpenForm('create')}
            >
                Novo
            </button>
            <PessoaList
                pessoas={pessoas}
                setSelectedPessoa={handleOpenDetails}
                onEditClick={handleOpenForm}
            />
            {showDetails && <PessoaDetails pessoa={selectedPessoa} onClose={handleCloseDetails} />}
            <FormModal
                showModal={showForm}
                onClose={handleCloseForm}
                initialData={currentPessoa}
                onSubmit={handleFormSubmit}
                title={formType === 'create' ? 'Novo Cadastro' : 'Editar Cadastro'}
            />
        </div>
    );
}

export default App;