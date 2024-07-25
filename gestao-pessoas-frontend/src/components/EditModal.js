import React from 'react';
import axios from 'axios';
import FormModal from './FormModal';

const EditModal = ({ showModal, pessoaToEdit, fetchPessoas, onClose }) => {
    const handleSubmit = async (formData) => {
        try {
            await axios.put(`http://localhost:8080/api/pessoas/${formData.id}`, {
                ...formData,
                cpf: formData.cpf.replace(/\D/g, '') 
            });
            await fetchPessoas();
            onClose();
        } catch (error) {
            console.error('Erro atualizando pessoa', error);
        }
    };

    return (
        <FormModal
            showModal={showModal}
            initialData={pessoaToEdit}
            onSubmit={handleSubmit}
            onClose={onClose} 
            title="Editar Pessoa"
        />
    );
};

export default EditModal;