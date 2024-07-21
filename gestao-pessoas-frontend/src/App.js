import React, { useState } from 'react';
import PessoaForm from './components/PessoaForm';
import PessoaList from './components/PessoaList';
import PessoaDetails from './components/PessoaDetails';

function App() {
    const [selectedPessoa, setSelectedPessoa] = useState(null);

    return (
        <div>
            <h1>Gestão de Pessoas</h1>
            <PessoaForm />
            <PessoaList setSelectedPessoa={setSelectedPessoa} />
            <PessoaDetails pessoa={selectedPessoa} />
        </div>
    );
}

export default App;
