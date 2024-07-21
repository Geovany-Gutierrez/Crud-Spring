import React from 'react';
import axios from 'axios';
import FormModal from './FormModal';

const EditModal = ({ showModal, onClose, pessoaToEdit, fetchPessoas }) => {
    const handleSubmit = async (formData) => {
        try {
            await axios.put(`http://localhost:8080/api/pessoas/${formData.id}`, {
                ...formData,
                cpf: formData.cpf.replace(/\D/g, '') 
            });
            await fetchPessoas();
            onClose(); 
        } catch (error) {
            console.error('Error updating pessoa', error);
        }
    };

    return (
        <FormModal
            showModal={showModal}
            onClose={onClose}
            initialData={pessoaToEdit}
            onSubmit={handleSubmit}
            title="Editar Pessoa"
        />
    );
};

export default EditModal;
