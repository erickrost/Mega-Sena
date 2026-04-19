import React, { createContext, useContext, useState, useEffect } from 'react';

interface Concurso {
  concurso: number;
  data_do_sorteio: string;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
  ganhadores_6_acertos: number;
  rateio_6_acertos: number;
  acumulado_6_acertos: number;
}

interface MegaSenaContextType {
  concurso: Concurso | null;
  mensagemErro: string;
  buscarConcurso: (numero: number) => void;
}

const MegaSenaContext = createContext<MegaSenaContextType>({} as MegaSenaContextType);

export const MegaSenaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [concurso, setConcurso] = useState<Concurso | null>(null);
  const [mensagemErro, setMensagemErro] = useState('');

  // Carrega o concurso mais recente ao inicializar
  useEffect(() => {
    fetch('http://localhost:3001/concurso/recente')
      .then(res => res.json())
      .then(data => {
        setConcurso(data);
        setMensagemErro('');
      })
      .catch(() => setMensagemErro('Erro ao conectar com o servidor.'));
  }, []);

  const buscarConcurso = (numero: number) => {
    fetch(`http://localhost:3001/concurso/${numero}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.mensagem); });
        }
        return res.json();
      })
      .then(data => {
        setConcurso(data);
        setMensagemErro('');
      })
      .catch((err: Error) => {
        setConcurso(null);
        setMensagemErro(err.message || 'Concurso não encontrado.');
      });
  };

  return (
    <MegaSenaContext.Provider value={{ concurso, mensagemErro, buscarConcurso }}>
      {children}
    </MegaSenaContext.Provider>
  );
};

export const useMegaSena = () => useContext(MegaSenaContext);