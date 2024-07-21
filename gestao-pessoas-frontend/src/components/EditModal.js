import React from 'react';
import axios from 'axios';
import FormModal from './FormModal';

const EditModal = ({ showModal, onClose, pessoaToEdit, fetchPessoas }) => {
    const handleSubmit = async (formData) => {
        await axios.put(`http://localhost:8080/api/pessoas/${formData.id}`, {
            ...formData,
            cpf: formData.cpf.replace(/\D/g, '')
        });
        fetchPessoas();
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
