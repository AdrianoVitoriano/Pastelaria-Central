import { useState } from 'react';
import Modal from 'react-modal';
export const Pop = ()=> {
  const [modalIsOpen, setIsOpen] = useState(false);
  function abrirModal() {
    setIsOpen(true);
  }
  function fecharModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button onClick={abrirModal}>Abrir modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel="Modal de exemplo"
      >
        <h2>Olá</h2>
        <button onClick={fecharModal}>Fechar</button>
        <div>Eu sou uma modal</div>
      </Modal>
    </div>
  );
}
