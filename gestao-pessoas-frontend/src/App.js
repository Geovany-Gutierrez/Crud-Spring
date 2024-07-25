import React, { useState } from 'react';
import axios from 'axios';
import PessoaList from './components/PessoaList';
import PessoaDetails from './components/PessoaDetails';
import FormModal from './components/FormModal';

function App() {
    const [pessoas, ] = useState([]);
    const [selectedPessoa, setSelectedPessoa] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [formType, setFormType] = useState('create');
    const [currentPessoa, setCurrentPessoa] = useState(null);

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
        setShowForm(false);
        setCurrentPessoa(null); 
    };

    const handleFormSubmit = async (formData) => {
        try {
            const url = formType === 'create' ? 'http://localhost:8080/api/pessoas' : `http://localhost:8080/api/pessoas/${formData.id}`;
            const method = formType === 'create' ? 'post' : 'put';

            await axios({ method, url, data: { ...formData, cpf: formData.cpf.replace(/\D/g, '') } });

            handleCloseForm(); 
        } catch (error) {
            console.error('Erro ao enviar dados', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Início <span className="sr-only">(atual)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:8080/swagger-ui/index.html#/" target="_blank" rel="noopener noreferrer">Documentação Swagger</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:8080/api/pessoas" target="_blank" rel="noopener noreferrer">JSON da API</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-5">
                <h1>Gestão de Pessoas</h1>
                <PessoaList
                    pessoas={pessoas}
                    setSelectedPessoa={handleOpenDetails}
                    onEditClick={(pessoa) => handleOpenForm('edit', pessoa)}
                />
                {showDetails && <PessoaDetails pessoa={selectedPessoa} onClose={handleCloseDetails} />}
                {showForm && (
                    <FormModal
                        showModal={showForm}
                        onClose={handleCloseForm}
                        initialData={currentPessoa}
                        onSubmit={handleFormSubmit}
                        title={formType === 'create' ? 'Novo Cadastro' : 'Editar Cadastro'}
                    />
                )}
            </div>
        </div>
    );
}

export default App;