import React, { useState, useEffect } from "react";
import MaskedInput from "react-text-mask";

const formatCPF = (value) => {
  if (!value) return "";
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }
  return cleaned;
};

const FormModal = ({ showModal, initialData, onSubmit, onClose, title }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        cpf: formatCPF(initialData.cpf),
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.nome) newErrors.nome = "Nome é obrigatório";
    else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nome))
      newErrors.nome = "Nome deve conter apenas letras e espaços";

    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório";
    else if (!isValidCpf(formData.cpf.replace(/\D/g, "")))
      newErrors.cpf = "CPF inválido";

    if (!formData.dataNascimento)
      newErrors.dataNascimento = "Data de nascimento é obrigatória";
    else if (formData.dataNascimento > today)
      newErrors.dataNascimento =
        "Data de nascimento não pode ser maior que a data atual";

    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";

    return newErrors;
  };

  const isValidCpf = (cpf) => {
    if (!cpf) return false;

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let d1 = 0;
    let d2 = 0;
    const pesos1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < 9; i++) {
      d1 += (cpf[i] - "0") * pesos1[i];
    }
    d1 = 11 - (d1 % 11);
    d1 = d1 > 9 ? 0 : d1;

    if (d1 !== cpf[9] - "0") return false;

    for (let i = 0; i < 10; i++) {
      d2 += (cpf[i] - "0") * pesos2[i];
    }
    d2 = 11 - (d2 % 11);
    d2 = d2 > 9 ? 0 : d2;

    return d2 === cpf[10] - "0";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ""),
      });
      setFormData({
        nome: "",
        cpf: "",
        dataNascimento: "",
        email: "",
      });
      setErrors({});
      setApiError("");
      onClose(); // Fechar o modal após o envio
    } catch (error) {
      setApiError("Erro ao enviar o formulário.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setErrors({});
    setApiError("");
    onClose(); // Fechar o modal ao cancelar
  };

  if (!showModal) return null;

  const renderInput = (type, name, mask, placeholder) => (
    <div className="form-group">
      <label>{placeholder}</label>
      {mask ? (
        <MaskedInput
          mask={mask}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          value={formData[name] || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData({ ...formData, [name]: formatCPF(newValue) });
          }}
          placeholder={placeholder}
          guide={false}
          keepCharPositions
          required
        />
      ) : (
        <input
          type={type}
          className={`form-control ${errors[name] ? "is-invalid" : ""}`}
          value={formData[name] || ""}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData({ ...formData, [name]: newValue });
          }}
          placeholder={placeholder}
          required
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={handleCancel}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {apiError && <div className="alert alert-danger">{apiError}</div>}
              {isLoading && (
                <div className="d-flex justify-content-center mb-3">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Carregando...</span>
                  </div>
                </div>
              )}
              {renderInput("text", "nome", null, "Nome")}
              {renderInput(
                "text",
                "cpf",
                [
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  ".",
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                ],
                "CPF"
              )}
              {renderInput(
                "date",
                "dataNascimento",
                null,
                "Data de Nascimento"
              )}
              {renderInput("email", "email", null, "Email")}
              <p className="mt-3">
                <a
                  href="https://www.4devs.com.br/gerador_de_cpf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clique aqui para gerar um CPF válido
                </a>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="d-flex align-items-center">
                    <div
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                    >
                      <span className="sr-only">Carregando...</span>
                    </div>
                    Salvando...
                  </div>
                ) : (
                  "Salvar"
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
