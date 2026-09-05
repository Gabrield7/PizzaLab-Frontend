import { useState } from "react";
import StatusIcon from "../status/StatusIcon";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import PaymentInfoBanner from "./PaymentInfoBanner";
import { formatarTelefone } from "../../lib/formatarTelefone";

// Complemento é o único campo opcional — todo o resto passa por `validar`.
function validar(form) {
  const erros = {};

  if (!form.nome.trim()) erros.nome = "Informe seu nome";

  const digitosTelefone = form.telefone.replace(/\D/g, "");
  if (digitosTelefone.length < 10) erros.telefone = "Telefone inválido";

  if (!form.logradouro.trim()) erros.logradouro = "Informe a rua";
  if (!form.numero.trim()) erros.numero = "Informe o número";
  if (!form.bairro.trim()) erros.bairro = "Informe o bairro";

  return erros;
}

// Card "Endereço de Entrega". O form fica controlado aqui dentro (não
// precisa subir cada tecla pro pai) — no submit expõe o objeto inteiro
// via onSubmit, junto com a preferência de salvar o endereço.
export default function AddressForm({ total, onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    logradouro: "",
    numero: "",
    bairro: "",
    complemento: "",
  });
  const [salvarEndereco, setSalvarEndereco] = useState(false);
  const [erros, setErros] = useState({});
  const [erroEnvio, setErroEnvio] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const limparErro = (field) =>
    setErros((atual) => {
      if (!atual[field]) return atual;
      const { [field]: _omitido, ...resto } = atual;
      return resto;
    });

  const setField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    // Some com o erro do campo assim que a pessoa começa a corrigi-lo,
    // em vez de esperar o próximo submit pra sumir.
    limparErro(field);
  };

  const handleTelefoneChange = (e) => {
    setForm((f) => ({ ...f, telefone: formatarTelefone(e.target.value) }));
    limparErro("telefone");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errosEncontrados = validar(form);
    setErros(errosEncontrados);
    if (Object.keys(errosEncontrados).length > 0) return;

    setErroEnvio(null);
    setEnviando(true);
    try {
      await onSubmit?.({ ...form, salvarEndereco });
    } catch (erro) {
      setErroEnvio(erro.message ?? "Não foi possível confirmar o pedido. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-superficie-borda bg-superficie-padrao p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-2">
        <StatusIcon icon="map-pin" size={18} className="text-texto-titulo" />
        <h2 className="text-lg font-bold text-texto-titulo">
          Endereço de Entrega
        </h2>
      </div>

      <Input
        label="Nome Completo"
        placeholder="Seu nome"
        value={form.nome}
        onChange={setField("nome")}
        error={erros.nome}
      />
      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        value={form.telefone}
        onChange={handleTelefoneChange}
        error={erros.telefone}
        maxLength={15}
        inputMode="numeric"
      />

      <div className="grid grid-cols-[1fr_auto] gap-4">
        <Input
          label="Rua"
          placeholder="Nome da rua"
          value={form.logradouro}
          onChange={setField("logradouro")}
          error={erros.logradouro}
        />
        <Input
          label="Número"
          placeholder="Nº"
          className="w-24"
          value={form.numero}
          onChange={setField("numero")}
          error={erros.numero}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bairro"
          placeholder="Nome do bairro"
          value={form.bairro}
          onChange={setField("bairro")}
          error={erros.bairro}
        />
        <Input
          label="Complemento"
          placeholder="Apto, bloco etc."
          value={form.complemento}
          onChange={setField("complemento")}
        />
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <Checkbox checked={salvarEndereco} onChange={setSalvarEndereco} />
        <span className="text-sm text-texto-titulo">
          Salvar endereço neste dispositivo
        </span>
      </label>

      <PaymentInfoBanner />

      {erroEnvio && <p className="text-sm text-feedback-erro">{erroEnvio}</p>}

      <Button type="submit" shape="rounded" size="md" className="w-full" loading={enviando}>
        Confirmar Pedido • {total}
      </Button>
    </form>
  );
}